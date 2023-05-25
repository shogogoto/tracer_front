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
  setIndex: (i: number) => void
}

export type ReturnType = [State, ReturnFuncs]

type Index = number | null

// 要素を切り替える
const useRotateChildren = (n: Rotatable, initIndex: Index = 0): ReturnType => {
  const children = rotatableToArray(n)
  const count = countChildren(children)
  const [index, setIndexDefault] = useState<Index>(initIndex)

  const increment = useCallback(() => {
    if (count === 0) return
    const nextIndex = ((index ?? 0) + 1) % count
    setIndexDefault(nextIndex)
  }, [count, index])

  const decrement = useCallback(() => {
    if (count === 0) return
    const prevIndex = ((index ?? 0) - 1 + count) % count
    setIndexDefault(prevIndex)
  }, [count, index])

  const setIndex = useCallback(
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
      setIndex(i)
    },
    [children, setIndex]
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
      setIndex,
    },
  ]
}

export default useRotateChildren
