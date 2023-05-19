import { useRef, useCallback, cloneElement, createRef } from "react"

import { activatableToArray } from "./funcs"

import type { Activatables } from "../types"
import type { ReactElement, RefObject, MutableRefObject } from "react"

type Refs = Array<RefObject<HTMLElement>>

type ReturnState = {
  forwardElements: ReactElement[]
  refs: MutableRefObject<Refs>
  // lastClicked: ReactNode
}

type ReturnFunc = {
  forwardClick: (i: number) => void
  clickedIndex: (e: MouseEvent) => number
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

  const clickedIndex = useCallback((e: MouseEvent) => {
    return 1
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
      clickedIndex,
    },
  ]
}

export default useForwardClick
