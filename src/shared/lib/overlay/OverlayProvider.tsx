import { Fragment, PropsWithChildren, ReactNode, createContext, useCallback, useMemo, useState } from "react"

type OverlayContextType = {
  mount(id: string, element: ReactNode): void
  unmount(id: string): void
}

export const OverlayContext = createContext<OverlayContextType | null>(null)
if (process.env.NODE_ENV !== "production") {
  OverlayContext.displayName = "OverlayContext"
}

export function OverlayProvider({ children }: PropsWithChildren) {
  const [overlayById, setOverlayById] = useState<Map<string, ReactNode>>(new Map())

  const mount = useCallback((id: string, element: ReactNode) => {
    setOverlayById((overlayById) => {
      const cloned = new Map(overlayById)
      cloned.set(id, element)
      return cloned
    })
  }, [])

  const unmount = useCallback((id: string) => {
    setOverlayById((overlayById) => {
      const cloned = new Map(overlayById)
      cloned.delete(id)
      return cloned
    })
  }, [])

  const context = useMemo(() => ({ mount, unmount }), [mount, unmount])

  return (
    <OverlayContext.Provider value={context}>
      {children}
      {[...overlayById.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </OverlayContext.Provider>
  )
}
