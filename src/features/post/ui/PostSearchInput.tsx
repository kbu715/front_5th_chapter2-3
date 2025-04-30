import { Search } from "lucide-react"
import { Input } from "../../../shared/ui"

interface PostSearchInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
}

export const PostSearchInput = ({ value, onChange, onSubmit }: PostSearchInputProps) => (
  <div className="relative flex-1">
    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input
      placeholder="게시물 검색..."
      className="pl-8"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSubmit()}
    />
  </div>
)
