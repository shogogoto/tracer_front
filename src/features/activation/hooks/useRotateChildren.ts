import { useState } from "react"
import type { ReactNode, Dispatch } from "react"
import flattenChildren from "react-flatten-children"
import * as ReactIs from "react-is"
import { countChildren } from "./funcs"

import { type Rotatable } from "../types"

export type ReturnType = {
  increment: () => void
  decrement: () => void
  child: ReactNode
  setIndex: Dispatch<number>
}

// 要素を切り替える
const useRotateChildren = (n: Rotatable): ReturnType => {
  let children: ReactNode[] = []
  if (Array.isArray(n)) {
    children = n
  } else if (ReactIs.isFragment(n)) {
    children = flattenChildren(n)
  } else {
    children = [n]
  }

  const count = countChildren(children)
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

  const child = children[index]

  return {
    increment,
    decrement,
    child,
    setIndex,
  }
}

export default useRotateChildren
