import { Children, type ReactNode, isValidElement } from "react"
import isEqual from "react-fast-compare"
import flattenChildren from "react-flatten-children"

import { rotatableToArray } from "./toarray"

import type { Index, Rotatable } from "../types"



export function countChildren(n: ReactNode): number {
  let count: number = -1
  if (isValidElement(n)) {
    count = flattenChildren(n.props.children).length
  } else {
    count = Children.count(n)
  }
  return count
}

export function indexChild(n: Rotatable, child: ReactNode): Index {
  const i = rotatableToArray(n).findIndex((e: ReactNode) => isEqual(e, child))
  return i === -1 ? null : i
}
