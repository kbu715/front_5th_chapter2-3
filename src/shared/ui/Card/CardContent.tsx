import { forwardRef } from "react"
import cn from "classnames"
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))

CardContent.displayName = "CardContent"
