import { useState, useCallback } from "react"
import type { SerializedStyles } from "@emotion/react"

import type { Activatable, Activatables } from "../types"
import { activatableToArray } from "./funcs"

type State = {
  isStyled: boolean[]
  styledElements: Activatables
}

type Func = {
  toggleStyle: (i: number) => void
}

type ReturnType = [State, Func]

type Props = {
  elms: Activatable[]
  initStyled: boolean
  css: SerializedStyles
}

const useStyle = (props: Props): ReturnType => {
  const arr = activatableToArray(props.elms)
  const [isStyled, setIsStyled] = useState<boolean[]>(
    Array(arr.length).fill(props.initStyled)
  )

  const toggleStyle = useCallback((i: number) => {
    setIsStyled((prev) => prev.map((e, j) => (j === i ? !e : e)))
  }, [])

  const styledElements = arr.map((elm, i) => (
    <div
      key={i}
      css={isStyled[i] && props.css}
    >
      {elm}
    </div>
  ))
  return [
    {
      isStyled,
      styledElements,
    },
    {
      toggleStyle,
    },
  ]
}

export default useStyle
