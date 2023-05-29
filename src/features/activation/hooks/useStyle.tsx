import { useState, useCallback } from "react"

import { activatableToArray } from "../utils"

import type { Activatables } from "../types"
import type { SerializedStyles } from "@emotion/react"

type State = {
  isStyled: boolean[]
  elements: Activatables
}

type Index = number | null | undefined

type Func = {
  toggleStyle: (i: Index) => void
}

type ReturnType = [State, Func]

type Props = {
  elms: Activatables
  initStyled: boolean
  css: SerializedStyles
}

const useStyle = (props: Props): ReturnType => {
  const arr = activatableToArray(props.elms)
  const [isStyled, setIsStyled] = useState<boolean[]>(
    Array(arr.length).fill(props.initStyled)
  )

  const toggleStyle = useCallback((i: Index) => {
    if (!Number.isInteger(i)) {
      return
    }
    setIsStyled((prev) => prev.map((e, j) => (j === i ? !e : e)))
  }, [])

  const elements = arr.map((elm, i) => (
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
      elements,
    },
    {
      toggleStyle,
    },
  ]
}

export default useStyle
