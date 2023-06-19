import { useRef, useCallback, cloneElement, createRef } from "react"

import { activatableToArray } from "../utils"

import type { Activatable, Activatables, Index } from "../types"
import type { RefObject, MutableRefObject } from "react"



type Refs = Array<RefObject<HTMLElement>>

type State = {
  elements: Activatable[]
  refs: MutableRefObject<Refs>
}

type Func = {
  click: (i: Index) => void
  scrollIntoView: (i: Index) => void
}

type ReturnType = [State, Func]

const useForwardClick = (elms: Activatables): ReturnType => {
  const arr = activatableToArray(elms)
  const refs = useRef<Refs>([])

  arr.forEach((_, i) => {
    refs.current[i] = createRef<HTMLElement>()
  })

  const click = useCallback((i: Index) => {
    if (i === null) return
    refs.current[i].current?.click()
  }, [])

  const scrollIntoView = useCallback((i: Index) => {
    if (i === null) return
    refs.current[i].current?.scrollIntoView({
      behavior: "auto",
      block: "center", // vertical
      inline: "center", // horizon
    })
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
      click,
      scrollIntoView,
    },
  ]
}

export default useForwardClick
