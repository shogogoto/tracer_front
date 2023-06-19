import type { MouseEvent } from "react"


export const clickedChildIndex = (ev: MouseEvent): number => {
  const nodes = ev.currentTarget?.childNodes
  return Array.from(nodes).findIndex((e) => e.contains(ev.target as ChildNode))
}
