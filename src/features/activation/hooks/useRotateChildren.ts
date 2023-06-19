import { useState, useCallback } from "react"

import {
  countChildren,
  rotatableToArray,
  IndexRotator,
  indexChild,
} from "../utils"

import type { Rotatable, Index } from "../types"
import type { Rotator } from "../utils"
import type { ReactNode, Dispatch, SetStateAction } from "react"


type State = {
  child: ReactNode
  index: Index
  count: number
  // firstIndex: Index
  // lastIndex: Index
  rotator: Rotator
}

type ReturnFuncs = {
  increment: () => void
  decrement: () => void
  setChild: (n: ReactNode) => void
  setIndex: Dispatch<SetStateAction<Index>>
}

export type ReturnType = [State, ReturnFuncs]

// 要素を切り替える
const useRotateChildren = (n: Rotatable, initIndex: Index = 0): ReturnType => {
  const children = rotatableToArray(n)
  const count = countChildren(children)
  const rot = IndexRotator.create(0, count - 1)
  const [index, setIndex] = useState<Index>(initIndex)

  const increment = useCallback(() => {
    setIndex(rot.increment(index))
  }, [index, rot])

  const decrement = useCallback(() => {
    setIndex(rot.decrement(index))
  }, [index, rot])

  const setChild = useCallback(
    (child: ReactNode) => {
      if (child == null) {
        const msg = "null or undefined is not allow to set"
        throw new RangeError(msg)
      }
      const i = indexChild(children, child)
      setIndex(i)
    },
    [children, setIndex]
  )

  const child = children[index ?? -1]

  return [
    {
      child,
      index,
      count,
      rotator: rot,
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
