import { forwardRef } from "react"
import cn from "classnames"
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  className?: string
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14", className)}
    {...props}
  />
))

TableRow.displayName = "TableRow"
