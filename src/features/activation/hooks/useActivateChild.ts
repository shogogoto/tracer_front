import { useState, useCallback } from "react"
import type { ReactNode } from "react"
import flattenChildren from "react-flatten-children"
import isEqual from "react-fast-compare"

import { indexChild } from "./funcs"

type ReturnFuncs = {
  activate: (target: ReactNode) => void
  deactivate: () => void
  isActivated: (node: ReactNode) => boolean
}

export type ReturnType = [activated: ReactNode, funcs: ReturnFuncs]

const useActivateChild = (n: ReactNode): ReturnType => {
  const [activated, setActivated] = useState<ReactNode>(null)
  const children = flattenChildren(n)

  const activate = useCallback((target: ReactNode) => {
    const i = indexChild(n, target)
    if (i === -1) {
      const msg = "This is not in the activate target children"
      throw new RangeError(msg)
    } else {
      setActivated(children[i])
    }
  }, [])

  const deactivate = useCallback(() => {
    setActivated(null)
  }, [])

  const isActivated = useCallback(
    (node: ReactNode): boolean => {
      return isEqual(activated, node)
    },
    [activated]
  )

  return [
    activated,
    {
      activate,
      deactivate,
      isActivated,
    },
  ]
}

export default useActivateChild
