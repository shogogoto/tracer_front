import { useRef, useCallback, cloneElement, createRef } from "react"

import { activatableToArray } from "./funcs"

import type { Activatables } from "../types"
import type { ReactElement, RefObject, MutableRefObject } from "react"

type Refs = Array<RefObject<HTMLElement>>

type State = {
  elements: ReactElement[]
  refs: MutableRefObject<Refs>
}

type Func = {
  forwardClick: (i: number) => void
}

type ReturnType = [State, Func]

const useForwardClick = (elms: Activatables): ReturnType => {
  const arr = activatableToArray(elms)
  const refs = useRef<Refs>([])

  arr.forEach((_, i) => {
    refs.current[i] = createRef<HTMLElement>()
  })

  const forwardClick = useCallback((i: number) => {
    refs.current[i].current?.click()
  }, [])

  const elements = arr.map((elm, i) =>
    cloneElement(elm, { ref: refs.current[i] })
  )

  return [
    {
      elements,
      refs,
    },
    {
      forwardClick,
    },
  ]
}

export default useForwardClick
