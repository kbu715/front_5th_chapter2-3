import { Select } from "@shared/ui"

interface PostSortBySelectProps {
  value: string
  onChange: (value: string) => void
}

export const PostSortBySelect = ({ value, onChange }: PostSortBySelectProps) => (
  <Select value={value} onValueChange={onChange}>
    <Select.Trigger className="w-[180px]">
      <Select.Value placeholder="정렬 기준" />
    </Select.Trigger>
    <Select.Content>
      <Select.Item value="none">없음</Select.Item>
      <Select.Item value="id">ID</Select.Item>
      <Select.Item value="title">제목</Select.Item>
      <Select.Item value="reactions">반응</Select.Item>
    </Select.Content>
  </Select>
)
