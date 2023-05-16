import { useState, useCallback } from "react"
import type { ReactNode, Dispatch } from "react"
import { countChildren, rotatableToArray } from "./funcs"

import { type Rotatable } from "../types"

type ReturnFuncs = {
  increment: () => void
  decrement: () => void
  setIndex: Dispatch<number>
}

export type ReturnType = [child: ReactNode, funcs: ReturnFuncs]

// 要素を切り替える
const useRotateChildren = (n: Rotatable): ReturnType => {
  const children = rotatableToArray(n)

  const count = countChildren(children)
  const [index, setIndexDefault] = useState(0)

  const increment = useCallback(() => {
    if (count === 0) return
    const nextIndex = (index + 1) % count
    setIndexDefault(nextIndex)
  }, [index])

  const decrement = useCallback(() => {
    if (count === 0) return
    const prevIndex = (index - 1 + count) % count
    setIndexDefault(prevIndex)
  }, [index])

  const setIndex = useCallback(
    (i: number): void => {
      if (i < 0 || count <= i) {
        const msg = `${i} is out of index [0,${count})`
        throw new RangeError(msg)
      } else {
        setIndexDefault(i)
      }
    },
    [index]
  )

  const child = children[index]

  return [
    child,
    {
      increment,
      decrement,
      setIndex,
    },
  ]
}

export default useRotateChildren
