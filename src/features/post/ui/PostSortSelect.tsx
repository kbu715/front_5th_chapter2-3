import { Select } from "@shared/ui"

interface PostSortSelectProps {
  value: string
  onChange: (value: string) => void
}

export const PostSortSelect = ({ value, onChange }: PostSortSelectProps) => (
  <Select value={value} onValueChange={onChange}>
    <Select.Trigger className="w-[180px]">
      <Select.Value placeholder="정렬 순서" />
    </Select.Trigger>
    <Select.Content>
      <Select.Item value="asc">오름차순</Select.Item>
      <Select.Item value="desc">내림차순</Select.Item>
    </Select.Content>
  </Select>
)
