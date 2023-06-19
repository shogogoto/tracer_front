import { useState, useCallback } from "react"

import { activatableToArray } from "../utils"

import type { Activatable, Activatables, Index } from "../types"
import type { SerializedStyles } from "@emotion/react"


type State = {
  isStyled: boolean[]
  elements: Activatable[]
}

type Func = {
  toggleStyle: (i: Index) => void
}

type ReturnType = [State, Func]

export type UseStyleProps = {
  elms: Activatables
  initStyled: boolean
  css: SerializedStyles
}

const useStyle = (props: UseStyleProps): ReturnType => {
  const arr = activatableToArray(props.elms)
  const [isStyled, setIsStyled] = useState<boolean[]>(
    Array(arr.length).fill(props.initStyled)
  )

  const toggleStyle = useCallback((next: Index): void => {
    if (!Number.isInteger(next)) return
    setIsStyled((prev) => {
      return prev.map((e, i) => (i === next ? !e : e))
    })
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
