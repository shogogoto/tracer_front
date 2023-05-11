import { Children, type ReactNode } from "react"

import * as ReactIs from "react-is"
import flattenChildren from "react-flatten-children"

export function countChildren(n: ReactNode): number {
  if (ReactIs.isElement(n)) {
    const c = n.props.children
    return flattenChildren(c).length
  } else {
    return Children.count(n)
  }
}
