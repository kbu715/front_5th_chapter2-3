import { forwardRef } from "react"
import { CardHeader } from "./CardHeader"
import { CardContent } from "./CardContent"
import { CardTitle } from "./CardTitle"
import cn from "classnames"
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const CardRoot = forwardRef<HTMLDivElement, CardProps>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props}>
    {children}
  </div>
))

CardRoot.displayName = "Card"

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Title: CardTitle,
})
