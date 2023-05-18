import { useRef, useCallback, cloneElement, createRef } from "react"
import type { ReactElement, RefObject, MutableRefObject } from "react"
import type { Activatables } from "../types"
import { activatableToArray } from "./funcs"

type Refs = Array<RefObject<HTMLElement>>

type ReturnState = {
  forwardElements: ReactElement[]
  refs: MutableRefObject<Refs>
}

type ReturnFunc = {
  forwardClick: (i: number) => void
}

type ReturnType = [ReturnState, ReturnFunc]

const useForwardClick = (elms: Activatables): ReturnType => {
  const arr = activatableToArray(elms)
  const refs = useRef<Refs>([])

  arr.forEach((_, i) => {
    refs.current[i] = createRef<HTMLElement>()
  })

  const forwardClick = useCallback((i: number) => {
    refs.current[i].current?.click()
  }, [])

  const forwardElements = arr.map((elm, i) =>
    cloneElement(elm, { ref: refs.current[i] })
  )
  return [
    {
      forwardElements,
      refs,
    },
    {
      forwardClick,
    },
  ]
}

export default useForwardClick
