import { Children, type ReactNode, useState } from "react"

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

type ReturnType = {
  cycle: () => void
  child: ReactNode
}

// 子要素の表示を切り替える
const useCyclicSwitch = (n: ReactNode): ReturnType => {
  const count = countChildren(n)
  const [index, setIndex] = useState(0)

  const cycle = (): void => {
    if (count === 0) return
    const nextIndex = (index + 1) % count
    setIndex(nextIndex)
  }

  let child: ReactNode = null
  if (ReactIs.isElement(n) && count > 0) {
    child = flattenChildren(n.props.children)[index]
  }

  return {
    cycle,
    child,
  }
}

export default useCyclicSwitch
