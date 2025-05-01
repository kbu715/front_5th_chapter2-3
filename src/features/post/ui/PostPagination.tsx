import { Pagination } from "../../../shared/ui"
import { usePostQueryParams } from "../model/hooks"

interface PostPaginationProps {
  total: number
}

const PostPagination = ({ total }: PostPaginationProps) => {
  const { params, setters } = usePostQueryParams()
  const { skip, limit } = params
  const { setSkip, setLimit } = setters

  return <Pagination skip={skip} limit={limit} total={total} onLimitChange={setLimit} onPageChange={setSkip} />
}

export default PostPagination
