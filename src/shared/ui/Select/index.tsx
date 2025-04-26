import * as SelectPrimitive from "@radix-ui/react-select"
import { ComponentProps } from "react"
import { SelectContent } from "./SelectContent"
import { SelectTrigger } from "./SelectTrigger"
import { SelectItem } from "./SelectItem"
import { SelectValue } from "./SelectValue"
import { SelectGroup } from "./SelectGroup"

const SelectPrimitiveRoot = SelectPrimitive.Root

type SelectProps = ComponentProps<typeof SelectPrimitive.Root>

const SelectRoot = ({ children, ...props }: SelectProps) => {
  return <SelectPrimitiveRoot {...props}>{children}</SelectPrimitiveRoot>
}

SelectRoot.displayName = SelectPrimitive.Root.displayName

export const Select = Object.assign(SelectRoot, {
  Content: SelectContent,
  Item: SelectItem,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Group: SelectGroup,
})
