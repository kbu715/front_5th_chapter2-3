import { ComponentProps, forwardRef } from "react"
import { X } from "lucide-react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import cn from "classnames"

export const DialogPortal = DialogPrimitive.Portal
export const DialogOverlay = DialogPrimitive.Overlay

type CustomProps = {
  className?: string
  description?: string
}

type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content> & CustomProps

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, description, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content
        ref={ref}
        aria-describedby={description ? "dialog-description" : undefined}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
          className,
        )}
        {...props}
      >
        {children}
        {description && (
          <DialogPrimitive.Description id="dialog-description" className="sr-only">
            {description}
          </DialogPrimitive.Description>
        )}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">닫기</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
)

DialogContent.displayName = DialogPrimitive.Content.displayName
