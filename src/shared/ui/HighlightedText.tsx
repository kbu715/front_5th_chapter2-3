interface HighlightedTextProps {
  text: string
  highlight: string
}

export const HighlightedText = ({ text, highlight }: HighlightedTextProps) => {
  if (!text) return null

  if (!highlight.trim()) return <span>{text}</span>

  const regex = new RegExp(`(${highlight})`, "gi")
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>,
      )}
    </>
  )
}
