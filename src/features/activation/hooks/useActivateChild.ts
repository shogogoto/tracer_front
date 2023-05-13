import { useState } from "react"
import type { ReactNode } from "react"
import flattenChildren from "react-flatten-children"
import isEqual from "react-fast-compare"

import { indexChild } from "./funcs"

export type ReturnType = {
  activated: ReactNode
  activate: (target: ReactNode) => void
  deactivate: () => void
  isActivated: (node: ReactNode) => boolean
}

const useActivateChild = (n: ReactNode): ReturnType => {
  const [activated, setActivated] = useState<ReactNode>(null)
  const children = flattenChildren(n)

  function activate(target: ReactNode): void {
    const i = indexChild(n, target)
    if (i === -1) {
      const msg = "This is not in the activate target children"
      throw new RangeError(msg)
    } else {
      setActivated(children[i])
    }
  }

  function deactivate(): void {
    setActivated(null)
  }

  function isActivated(node: ReactNode): boolean {
    return isEqual(activated, node)
  }

  return {
    activated,
    activate,
    deactivate,
    isActivated,
  }
}

export default useActivateChild
