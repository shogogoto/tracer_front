import flattenChildren from "react-flatten-children"
import * as ReactIs from "react-is"

import type { Activatable, Activatables, Rotatable } from "../types"
import type { ReactNode } from "react"


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
