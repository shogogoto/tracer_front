import { useState, useCallback } from "react"
import { css } from "@emotion/react"
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

  const styledElement = <div css={isStyled && cssActivated}>{props.n}</div>

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

export const cssActivated = css`
  color: red;
  border: solid;
`
export default useStyle
