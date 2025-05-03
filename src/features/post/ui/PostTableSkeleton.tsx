import { Table } from "../../../shared/ui"
import Skeleton from "../../../shared/ui/Skeleton"
import { PostTableHeader } from "./PostTableHeader"

export const PostTableSkeleton = () => {
  return (
    <Table>
      <PostTableHeader />
      <Table.Body>
        {Array.from({ length: 10 }).map((_, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <Skeleton className="w-[15px] h-[15px] rounded-[4px]" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton className="w-[168px] lg:w-[426px] h-[15px] rounded-[4px]" />
              <div className="flex flex-wrap gap-1">
                <Skeleton className="w-[40px] h-[15px] rounded-[4px]" />
                <Skeleton className="w-[40px] h-[15px] rounded-[4px]" />
                <Skeleton className="w-[40px] h-[15px] rounded-[4px]" />
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-2">
                <Skeleton className="w-[32px] h-[32px] rounded-[4px]" />
                <Skeleton className="w-[60px] h-[20px] rounded-[4px]" />
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-2">
                <Skeleton className="w-[16px] h-[16px] rounded-[4px]" />
                <Skeleton className="w-[24px] h-[16px] rounded-[4px]" />
                <Skeleton className="w-[16px] h-[16px] rounded-[4px]" />
                <Skeleton className="w-[20px] h-[16px] rounded-[4px]" />
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-2">
                <span className="px-3">
                  <Skeleton className="w-[16px] h-[16px] rounded-[4px]" />
                </span>
                <span className="px-3">
                  <Skeleton className="w-[16px] h-[16px] rounded-[4px]" />
                </span>
                <span className="px-3">
                  <Skeleton className="w-[16px] h-[16px] rounded-[4px]" />
                </span>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
