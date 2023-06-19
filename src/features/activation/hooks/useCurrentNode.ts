import { useState, useCallback } from "react"
import isEqual from "react-fast-compare"
import * as ReactIs from "react-is"

import type { ReactNode } from "react"


type ReturnFuncs = {
  set: (target: ReactNode) => void
  unset: () => void
  isCurrent: (node: ReactNode) => boolean
}

export type ReturnType = [node: ReactNode, funcs: ReturnFuncs]

const useCurrentNode = (init: ReactNode): ReturnType => {
  const [current, setCurrent] = useState<ReactNode>(init)

  const set = useCallback((target: ReactNode) => {
    if (ReactIs.isElement(target)) {
      setCurrent(target)
    } else {
      const msg = "You shouhd set element to current node"
      throw new RangeError(msg)
    }
  }, [])

  const unset = useCallback(() => {
    setCurrent(null)
  }, [])

  const isCurrent = useCallback(
    (n: ReactNode): boolean => isEqual(current, n),
    [current]
  )

  return [
    current,
    {
      set,
      unset,
      isCurrent,
    },
  ]
}

export default useCurrentNode
