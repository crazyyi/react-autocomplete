import { useCallback, useEffect, useState } from "react"

export const useOutsideClick = (ref: any, dependencies: any[] = []) => {
  const [show, setShow] = useState(false)

  const handler = useCallback(({ target }: Event) => !ref.current?.contains(target) && setShow(false), [ref, setShow])

  useEffect(() => {
    document.addEventListener("click", handler)
    return () => document.removeEventListener("click", handler)
  }, [handler, dependencies])

  const clickHandler: any = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    setShow(true)
  }

  return { show, setShow, clickHandler }

}