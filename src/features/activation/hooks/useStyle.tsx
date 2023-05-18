import { useState, useCallback } from "react"
import type { SerializedStyles } from "@emotion/react"

import type { Activatable } from "../types"

type State = {
  isStyled: boolean
  styledElement: Activatable
}

type Func = {
  toggleStyle: VoidFunction
}

type ReturnType = [State, Func]

type Props = {
  n: Activatable
  initStyled: boolean
  css: SerializedStyles
}

const useStyle = (props: Props): ReturnType => {
  const [isStyled, setIsStyled] = useState(props.initStyled)

  const toggleStyle = useCallback(() => {
    setIsStyled(!isStyled)
  }, [isStyled])

  const styledElement = <div css={isStyled && props.css}>{props.n}</div>

  return [
    {
      isStyled,
      styledElement,
    },
    {
      toggleStyle,
    },
  ]
}

export default useStyle
