import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentProps } from "react"
import { DialogTrigger } from "./DialogTrigger"
import { DialogContent } from "./DialogContent"
import { DialogTitle } from "./DialogTitle"
import { DialogHeader } from "./DialogHeader"

const DialogPrimitiveRoot = DialogPrimitive.Root

type DialogProps = ComponentProps<typeof DialogPrimitive.Root>

const DialogRoot = ({ children, ...props }: DialogProps) => {
  return <DialogPrimitiveRoot {...props}>{children}</DialogPrimitiveRoot>
}

DialogRoot.displayName = DialogPrimitive.Root.displayName

export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Header: DialogHeader,
  Content: DialogContent,
  Title: DialogTitle,
})
