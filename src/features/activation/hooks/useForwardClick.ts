import { useRef, useCallback, cloneElement, createRef, useState } from "react"

import { activatableToArray } from "./funcs"

import type { Activatable, Activatables } from "../types"
import type {
  ReactElement,
  RefObject,
  MutableRefObject,
  ReactNode,
} from "react"

type Refs = Array<RefObject<HTMLElement>>

type ReturnState = {
  forwardElements: ReactElement[]
  refs: MutableRefObject<Refs>
  // lastClicked: ReactNode
}

type ReturnFunc = {
  forwardClick: (i: number) => void
  latestClicked: (e: MouseEvent) => Activatable | null
}

type ReturnType = [ReturnState, ReturnFunc]

const useForwardClick = (elms: Activatables): ReturnType => {
  const arr = activatableToArray(elms)
  const refs = useRef<Refs>([])
  const [latest, setLatest] = useState<ReactNode>(null)

  arr.forEach((_, i) => {
    refs.current[i] = createRef<HTMLElement>()
  })

  const forwardClick = useCallback(
    (i: number) => {
      setLatest(arr[i])
      refs.current[i].current?.click()
    },
    [arr]
  )

  const latestClicked = useCallback(
    (e: MouseEvent) => {
      // console.log(latest)
      return arr[0]
      // return arr.filter((_,i) => {
      //   console.log("filter", latest)
      //   // console.log(refs.current[i].current)
      //   // return refs.current[i].current === e.target
      //   return null
      // })
    },
    [latest]
  )

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
      latestClicked,
    },
  ]
}

export default useForwardClick
