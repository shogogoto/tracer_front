import { useRef, useCallback } from "react"
import type { ReactNode, RefObject } from "react"
import { useKey } from "react-use"

import type { Activatable } from "../types"
import { useCurrentElement } from "."

type Props = {
  children: Activatable
  action?: VoidFunction
  init?: ReactNode
}

type ReturnState = {
  ref: RefObject<HTMLElement>
  isActive: boolean
}

type ReturnFunc = {
  handleClick: VoidFunction
}

type ReturnType = [ReturnState, ReturnFunc]

const useActivation = ({
  children,
  action = () => {},
  init,
}: Props): ReturnType => {
  const ref = useRef<HTMLElement>(null)
  const [current, funcs] = useCurrentElement(init)
  const handleClick = useCallback(() => {
    funcs.set(children)
    action()
    ref.current?.click()
  }, [current])

  useKey("Enter", action, {}, [])
  const isActive = funcs.isCurrent(children)

  return [
    {
      ref,
      isActive,
    },
    {
      handleClick,
    },
  ]
}

export default useActivation
