import { Ref, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react"

import { CreateOverlayElement } from "./types"

interface Props {
  overlayElement: CreateOverlayElement
  onExit: () => void
}

export interface OverlayControlRef {
  close: () => void
}

export const OverlayController = forwardRef(function OverlayController(
  { overlayElement: OverlayElement, onExit }: Props,
  ref: Ref<OverlayControlRef>,
) {
  const [isOpenOverlay, setIsOpenOverlay] = useState(false)

  const handleOverlayClose = useCallback(() => setIsOpenOverlay(false), [])

  useImperativeHandle(ref, () => {
    return { close: handleOverlayClose }
  }, [handleOverlayClose])

  useEffect(() => {
    setTimeout(() => {
      setIsOpenOverlay(true)
    }, 1)
  }, [])

  return <OverlayElement isOpen={isOpenOverlay} close={handleOverlayClose} exit={onExit} />
})
