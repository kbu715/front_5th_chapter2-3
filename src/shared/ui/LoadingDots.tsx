export const LoadingDots = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999]">
      <div className="flex flex-row gap-2">
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"></div>
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </div>
  )
}
