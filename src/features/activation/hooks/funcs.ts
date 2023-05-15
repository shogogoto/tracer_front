import { Children, type ReactNode, isValidElement } from "react"
import flattenChildren from "react-flatten-children"
import isEqual from "react-fast-compare"

export function countChildren(n: ReactNode): number {
  let count: number = -1
  if (isValidElement(n)) {
    count = flattenChildren(n.props.children).length
  } else {
    count = Children.count(n)
  }
  return count
}

export function indexChild(n: ReactNode, child: ReactNode): number {
  return flattenChildren(n).findIndex((e: ReactNode) => isEqual(e, child))
}
