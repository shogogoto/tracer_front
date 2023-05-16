import { useState, useCallback } from "react"
import type { ReactNode } from "react"
import isEqual from "react-fast-compare"
import * as ReactIs from "react-is"

type ReturnFuncs = {
  set: (target: ReactNode) => void
  unset: () => void
  isCurrent: (node: ReactNode) => boolean
}

export type ReturnType = [node: ReactNode, funcs: ReturnFuncs]

const useCurrentElement = (init: ReactNode): ReturnType => {
  const [node, setNode] = useState<ReactNode>(init)

  const set = useCallback(
    (target: ReactNode) => {
      if (ReactIs.isElement(target)) {
        setNode(target)
      } else {
        const msg = "You shouhd set element to current node"
        throw new RangeError(msg)
      }
    },
    [node]
  )

  const unset = useCallback(() => {
    setNode(null)
  }, [node])

  const isCurrent = useCallback(
    (n: ReactNode): boolean => isEqual(node, n),
    [node]
  )

  return [
    node,
    {
      set,
      unset,
      isCurrent,
    },
  ]
}

export default useCurrentElement
