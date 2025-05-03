import { forwardRef } from "react"
import cn from "classnames"

interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  className?: string
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("p-2 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
))

TableCell.displayName = "TableCell"
