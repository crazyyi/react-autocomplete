import { ComponentProps, useCallback, useRef } from "react"
import { AutocompleteProps } from "./Autocomplete.types"
import { useOutsideClick } from "../../utils/hooks"
import { v4 } from 'uuid'
import "./style.css"

export const Autocomplete = (
  {
    label,
    list,
    renderItem,
    ...props
  }: AutocompleteProps) => {
  const refDiv = useRef<HTMLDivElement>(null)
  const { show, clickHandler } = useOutsideClick(refDiv.current)

  const itemProps = {

  }

  const renderInput = ({ domProps }: { domProps?: ComponentProps<'input'> } = { domProps: {} }) => (
    <input data-testid="input" {...domProps} ></input>
  )

  const renderList = useCallback(({ list, domProps = {} }: {
    list: string[], domProps?: ComponentProps<'ul'>
  }) => {
    return list && list.length > 0 && <ul data-testid="listbox" aria-label="datalist" className="list" {...domProps}>{list.map((value) => <li key={v4()}>{renderItem?.({})?.(value)}</li>)}</ul>
  }, [renderItem])

  const renderError = () => (
    <div data-testid="error"></div>
  )

  return <div data-testid="wrapper" ref={refDiv} className="autocomplete-wrap" onClick={clickHandler}>
    {renderInput()}
    {show && renderList({ list })}
    {renderError()}
  </div>
}