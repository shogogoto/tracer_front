import { isValidElement, useState } from "react"
import type { ReactNode, Dispatch } from "react"
import flattenChildren from "react-flatten-children"

import { countChildren } from "./funcs"

export type ReturnType = {
  increment: () => void
  decrement: () => void
  child: ReactNode
  setIndex: Dispatch<number>
}

// 子要素の表示を切り替える
const useRotateChildren = (n: ReactNode): ReturnType => {
  const count = countChildren(n)
  const [index, setIndexDefault] = useState(0)

  const increment = (): void => {
    if (count === 0) return
    const nextIndex = (index + 1) % count
    setIndexDefault(nextIndex)
  }

  const decrement = (): void => {
    if (count === 0) return
    const prevIndex = (index - 1 + count) % count
    setIndexDefault(prevIndex)
  }

  const setIndex = (i: number): void => {
    if (i < 0 || count <= i) {
      const msg = `${i} is out of index [0,${count})`
      throw new RangeError(msg)
    } else {
      setIndexDefault(i)
    }
  }

  let child: ReactNode = null
  if (isValidElement(n) && count > 0) {
    child = flattenChildren(n.props.children)[index]
  }

  return {
    increment,
    decrement,
    child,
    setIndex,
  }
}

export default useRotateChildren
