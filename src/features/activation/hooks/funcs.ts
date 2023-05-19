import { Children, type ReactNode, isValidElement } from "react"
import isEqual from "react-fast-compare"
import flattenChildren from "react-flatten-children"
import * as ReactIs from "react-is"

import type { Activatable, Activatables, Rotatable } from "../types"

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

export const rotatableToArray = (n: Rotatable): ReactNode[] => {
  let children: ReactNode[]
  if (Array.isArray(n)) {
    children = n
  } else if (ReactIs.isFragment(n)) {
    children = flattenChildren(n)
  } else {
    children = [n]
  }
  return children
}

export const activatableToArray = (n: Activatables): Activatable[] => {
  let children: Activatable[]
  if (Array.isArray(n)) {
    children = n
  } else {
    children = [n]
  }
  return children
}
