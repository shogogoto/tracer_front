import { useState, useCallback } from "react"
import isEqual from "react-fast-compare"

import { countChildren, rotatableToArray } from "./funcs"

import type { Rotatable } from "../types"
import type { ReactNode } from "react"

type State = {
  child: ReactNode
  index: number
}

type ReturnFuncs = {
  increment: () => void
  decrement: () => void
  setChild: (n: ReactNode) => void
}

export type ReturnType = [State, ReturnFuncs]

// 要素を切り替える
const useRotateChildren = (n: Rotatable): ReturnType => {
  const children = rotatableToArray(n)
  const count = countChildren(children)
  const [index, setIndexDefault] = useState(0)

  const increment = useCallback(() => {
    if (count === 0) return
    const nextIndex = (index + 1) % count
    setIndexDefault(nextIndex)
  }, [count, index])

  const decrement = useCallback(() => {
    if (count === 0) return
    const prevIndex = (index - 1 + count) % count
    setIndexDefault(prevIndex)
  }, [count, index])

  const _setIndex = useCallback(
    (i: number): void => {
      if (i < 0 || count <= i) {
        const msg = `${i} is out of index [0,${count})`
        throw new RangeError(msg)
      } else {
        setIndexDefault(i)
      }
    },
    [count]
  )

  const setChild = useCallback(
    (child: ReactNode) => {
      const i = children.findIndex((e) => isEqual(e, child))
      _setIndex(i)
    },
    [children, _setIndex]
  )

  const child = children[index]

  return [
    {
      child,
      index,
    },
    {
      increment,
      decrement,
      setChild,
    },
  ]
}

export default useRotateChildren
