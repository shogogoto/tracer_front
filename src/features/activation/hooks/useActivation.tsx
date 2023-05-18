import { css } from "@emotion/react"
import type { ReactElement } from "react"
import { useMemo, useCallback } from "react"

import type { Activatable } from "../types"
import { useForwardClick, useStyle } from "../hooks"

export const cssActivated = css`
  color: red;
  border: solid;
`

type Props = {
  children: Activatable
  initStyled?: boolean
}

type State = {
  activationElement: ReactElement
  isStyled: boolean
}

type Func = {
  handleClick: VoidFunction
  toggleStyle: VoidFunction
}

type ReturnType = [State, Func]

const useActivation = (props: Props): ReturnType => {
  const [fSt, fFn] = useForwardClick(props.children)
  const [sSt, sFn] = useStyle({
    n: fSt.forwardElements[0],
    initStyled: props.initStyled ?? false,
    css: cssActivated,
  })

  const handleClick: VoidFunction = useCallback(() => {
    sFn.toggleStyle()
    fFn.forwardClick(0)
  }, [fFn, sFn])

  const activationElement = useMemo(
    () => <div onClick={handleClick}>{sSt.styledElement}</div>,
    [handleClick, sSt.styledElement]
  )

  return [
    {
      activationElement,
      isStyled: sSt.isStyled,
    },
    {
      handleClick,
      toggleStyle: sFn.toggleStyle,
    },
  ]
}

export default useActivation
