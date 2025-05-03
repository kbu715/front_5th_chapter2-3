import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentProps, forwardRef } from "react"
import cn from "classnames"
type CustomProps = {
  className?: string
}

type DialogTitleProps = ComponentProps<typeof DialogPrimitive.Title> & CustomProps

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))

DialogTitle.displayName = DialogPrimitive.Title.displayName
