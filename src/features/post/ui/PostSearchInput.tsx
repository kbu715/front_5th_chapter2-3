import { Search } from "lucide-react"
import { Input } from "@shared/ui"
import { usePostQueryParams } from "@features/post/model/hooks"
import { useState } from "react"

export const PostSearchInput = () => {
  const { setters, params } = usePostQueryParams()
  const { setSearch } = setters
  const { search } = params

  const [value, setValue] = useState(search)

  return (
    <div className="relative flex-1">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="게시물 검색..."
        className="pl-8"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            setSearch(value)
          }
        }}
      />
    </div>
  )
}
