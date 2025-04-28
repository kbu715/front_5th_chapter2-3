import { Tag } from "../../../entities/post/model/types"
import { Select } from "../../../shared/ui"

interface PostTagFilterProps {
  selectedTag: string
  onSelectTag: (tag: string) => void
  tags: Tag[]
}

export const PostTagFilter = ({ selectedTag, onSelectTag, tags }: PostTagFilterProps) => (
  <Select value={selectedTag} onValueChange={onSelectTag}>
    <Select.Trigger className="w-[180px]">
      <Select.Value placeholder="태그 선택" />
    </Select.Trigger>
    <Select.Content>
      <Select.Item value="all">모든 태그</Select.Item>
      {tags.map((tag) => (
        <Select.Item key={tag.url} value={tag.slug}>
          {tag.slug}
        </Select.Item>
      ))}
    </Select.Content>
  </Select>
)
