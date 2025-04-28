import { useCallback } from "react"
import { Button } from "./Button"
import { Select } from "./Select"

interface PaginationProps {
  skip: number
  limit: number
  total: number
  onLimitChange: (newLimit: number) => void
  onPageChange: (newSkip: number) => void
  limitOptions?: number[]
}

export const Pagination = ({
  skip,
  limit,
  total,
  onLimitChange,
  onPageChange,
  limitOptions = [10, 20, 30],
}: PaginationProps) => {
  const handlePrev = useCallback(() => {
    onPageChange(Math.max(0, skip - limit))
  }, [onPageChange, limit, skip])

  const handleNext = useCallback(() => {
    onPageChange(skip + limit)
  }, [onPageChange, limit, skip])

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={(value) => onLimitChange(Number(value))}>
          <Select.Trigger className="w-[180px]">
            <Select.Value placeholder="선택" />
          </Select.Trigger>
          <Select.Content>
            {limitOptions.map((option) => (
              <Select.Item key={option} value={option.toString()}>
                {option}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={handlePrev}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={handleNext}>
          다음
        </Button>
      </div>
    </div>
  )
}
