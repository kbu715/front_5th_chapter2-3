import cn from "classnames"

type Props = {
  className?: string
}

const Skeleton = ({ className }: Props) => {
  return (
    <span
      className={cn([
        "inline-block bg-gray-200 relative overflow-hidden",
        "after:animate-[wave_1.2s_linear_0.3s_infinite_normal_none_running] after:content-[''] after:absolute after:translate-x-[-100%] after:inset-0",
        "after:bg-gradient-to-r after:from-[transparent] after:via-[rgba(255,255,255,0.2)] after:to-[transparent]",
        className,
      ])}
      role="status"
      aria-busy="true"
      aria-live="polite"
    />
  )
}

export default Skeleton
