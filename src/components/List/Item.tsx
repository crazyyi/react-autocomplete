import { ComponentProps } from "react"

export interface ItemProps {
  // label: string,
  // highlight?: boolean,
  domProps?: ComponentProps<'div'>
}

export const Item = ({
  domProps
}: ItemProps) => (value: string) => {
  return (
    <div {...domProps}>{value}</div>
  )
}