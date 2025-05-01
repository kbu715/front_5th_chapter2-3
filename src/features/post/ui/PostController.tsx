import { Tag } from "../../../entities/post/model/types"
import { usePostQueryParams } from "../model/hooks"
import { PostSearchInput } from "./PostSearchInput"
import { PostSortBySelect } from "./PostSortBySelect"
import { PostSortSelect } from "./PostSortSelect"
import { PostTagFilter } from "./PostTagFilter"

interface PostControllerProps {
  tags: Tag[]
  handleSearchPosts: () => void
}

const PostController = ({ tags, handleSearchPosts }: PostControllerProps) => {
  const { params, setters } = usePostQueryParams()
  const { search, sortBy, sortOrder, tag } = params
  const { setSearch, setSortBy, setSortOrder, setTag } = setters

  return (
    <div className="flex gap-4">
      <PostSearchInput value={search} onChange={setSearch} onSubmit={handleSearchPosts} />
      <PostTagFilter selectedTag={tag} onSelectTag={setTag} tags={tags} />
      <PostSortBySelect value={sortBy} onChange={setSortBy} />
      <PostSortSelect value={sortOrder} onChange={(value) => setSortOrder(value as "asc" | "desc")} />
    </div>
  )
}

export default PostController
