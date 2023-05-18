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
    elms: fSt.forwardElements,
    initStyled: props.initStyled ?? false,
    css: cssActivated,
  })

  const handleClick: VoidFunction = useCallback(() => {
    console.log("click!")
    sFn.toggleStyle(0)
    fFn.forwardClick(0)
  }, [sFn, fFn])

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
