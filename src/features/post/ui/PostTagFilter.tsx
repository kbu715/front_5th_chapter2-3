import { usePostTagsQuery } from "@entities/post/model/hooks/queries"
import { Select } from "@shared/ui"

interface PostTagFilterProps {
  selectedTag: string
  onSelectTag: (tag: string) => void
}

export const PostTagFilter = ({ selectedTag, onSelectTag }: PostTagFilterProps) => {
  const { data: tags } = usePostTagsQuery()
  return (
    <Select value={selectedTag} onValueChange={onSelectTag}>
      <Select.Trigger className="w-[180px]">
        <Select.Value placeholder="태그 선택" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="all">모든 태그</Select.Item>
        {tags?.map((tag) => (
          <Select.Item key={tag.url} value={tag.slug}>
            {tag.slug}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  )
}
