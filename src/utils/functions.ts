export function debounce<T>
  (func: (this: T, ...args: any[]) => void, wait: number): (this: T, ...args: any[]) => void {
  let timeout: ReturnType<typeof setTimeout> | null
  return function (this: T, ...args: any[]) {
    const context = this
    const executor = () => {
      timeout = null
      func.apply(context, args)
    }
    timeout && clearTimeout(timeout)
    timeout = setTimeout(executor, wait)
  }
}