import { css } from "@emotion/react"
import { useMemo, useCallback } from "react"

import { useForwardClick, useStyle, useRotateChildren } from "../hooks"

import type { Activatables } from "../types"
import type { MouseEventHandler, ReactElement } from "react"

export const cssActivated = css`
  color: red;
  border: solid;
`

type Props = {
  children: Activatables
  initStyled?: boolean
}

type State = {
  activationElement: ReactElement
  isStyled: boolean
}

type Func = {
  handleClick: MouseEventHandler
  toggleStyle: VoidFunction
}

type ReturnType = [State, Func]

const useActivation = (props: Props): ReturnType => {
  const [fSt, fFn] = useForwardClick(props.children)
  const [sSt, sFn] = useStyle({
    elms: fSt.forwardElements,
    initStyled: props.initStyled ?? false,
    css: cssActivated,
  })
  const [rSt] = useRotateChildren(sSt.styledElements)

  const handleClick: MouseEventHandler = useCallback(
    (e) => {
      // console.log(e.target)
      sFn.toggleStyle(rSt.index)
      fFn.forwardClick(rSt.index)
    },
    [sFn, fFn, rSt]
  )

  const activationElement = useMemo(
    () => <div onClick={handleClick}>{sSt.styledElements}</div>,
    [handleClick, sSt]
  )

  return [
    {
      activationElement,
      isStyled: sSt.isStyled[0],
    },
    {
      handleClick,
      toggleStyle: () => {
        sFn.toggleStyle(0)
      },
    },
  ]
}

export default useActivation
