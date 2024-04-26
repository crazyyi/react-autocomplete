import { ReactElement, Ref } from "react";
import { ItemProps } from "../List/Item";

interface Props<T> {
  /**
     * Ref to the DOM node.
     */
  ref?: Ref<HTMLElement | null>;
  label: string;
  list: string[];
  renderItem?: (itemProps: ItemProps) => (value: string) => ReactElement<ItemProps>
}

export type AutocompleteProps<T = object> = Props<T>