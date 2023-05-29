import { useState, useCallback } from "react"
import isEqual from "react-fast-compare"

import { countChildren, rotatableToArray } from "../utils"

import type { Rotatable, Index } from "../types"
import type { ReactNode, Dispatch, SetStateAction } from "react"

type State = {
  child: ReactNode
  index: Index
}

type ReturnFuncs = {
  increment: () => void
  incremental: (i: Index) => Index
  decrement: () => void
  decremental: (i: Index) => Index
  setChild: (n: ReactNode) => void
  setIndex: Dispatch<SetStateAction<Index>>
}

export type ReturnType = [State, ReturnFuncs]

// 要素を切り替える
const useRotateChildren = (n: Rotatable, initIndex: Index = 0): ReturnType => {
  const children = rotatableToArray(n)
  const count = countChildren(children)
  const [index, setIndexDefault] = useState<Index>(initIndex)

  const incremental = useCallback(
    (i: Index): Index => {
      return i === null ? 0 : ((i ?? 0) + 1) % count
    },
    [count]
  )

  const decremental = useCallback(
    (i: Index): Index => {
      const last = count - 1
      return i === null ? last : ((i ?? 0) - 1 + count) % count
    },
    [count]
  )

  const increment = useCallback(() => {
    if (count === 0) return
    setIndexDefault(incremental(index))
  }, [count, index, incremental])

  const decrement = useCallback(() => {
    if (count === 0) return
    setIndexDefault(decremental(index))
  }, [count, index, decremental])

  const _checkOutOfRange = useCallback(
    (i: number): void => {
      if (i < 0 || count <= i) {
        const msg = `${i} is out of index [0,${count})`
        throw new RangeError(msg)
      }
    },
    [count]
  )

  const setIndex = useCallback(
    (a: SetStateAction<Index>): void => {
      if (typeof a === "number") {
        _checkOutOfRange(a)
      }
      setIndexDefault(a)
    },
    [_checkOutOfRange]
  )

  const setChild = useCallback(
    (child: ReactNode) => {
      const i = children.findIndex((e) => isEqual(e, child))
      setIndex(i)
    },
    [children, setIndex]
  )

  const child = children[index ?? -1]

  return [
    {
      child,
      index,
    },
    {
      increment,
      incremental,
      decrement,
      decremental,
      setChild,
      setIndex,
    },
  ]
}

export default useRotateChildren
