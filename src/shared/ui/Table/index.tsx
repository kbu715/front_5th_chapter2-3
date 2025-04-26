import { forwardRef } from "react"
import { TableBody } from "./TableBody"
import { TableHeader } from "./TableHeader"
import { TableRow } from "./TableRow"
import { TableCell } from "./TableCell"
import { TableHead } from "./TableHead"

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  className?: string
}

const TableRoot = forwardRef<HTMLTableElement, TableProps>(({ children, className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table ref={ref} className={`table-fixed w-full caption-bottom text-sm ${className}`} {...props}>
      {children}
    </table>
  </div>
))

TableRoot.displayName = "Table"

export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
})
