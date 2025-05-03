import { forwardRef } from "react"
import cn from "classnames"
interface TableHeadProps extends React.HTMLAttributes<HTMLTableCellElement> {
  className?: string
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
))

TableHead.displayName = "TableHead"
