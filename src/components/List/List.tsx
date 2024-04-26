export const List = ({ list, renderItem }: { list: string[], renderItem: (value: string) => JSX.Element }) => {
  return list && list.length > 0 && <div>{list.map(renderItem)}</div>
}