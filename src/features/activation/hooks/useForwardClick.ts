import { useRef, useCallback, cloneElement } from "react"
import type { ReactElement, RefObject } from "react"

import type { Activatable } from "../types"

type ReturnState = {
  forwardElement: ReactElement
  ref: RefObject<HTMLElement>
}

type ReturnFunc = {
  forwardClick: VoidFunction
}

type ReturnType = [ReturnState, ReturnFunc]

const useForwardClick = (
  node: Activatable,
  preaction: VoidFunction = () => {},
  postaction: VoidFunction = () => {}
): ReturnType => {
  const ref = useRef<HTMLElement>(null)
  const forwardClick = useCallback(() => {
    preaction()
    ref.current?.click()
    postaction()
  }, [])

  const forwardElement = cloneElement(node, { ref })

  return [
    {
      forwardElement,
      ref,
    },
    {
      forwardClick,
    },
  ]
}

export default useForwardClick
