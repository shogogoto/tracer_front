import { cloneElement } from "react"
import type { ReactNode, FC } from "react"
import { css } from "@emotion/react"

import type { Activatable } from "../types"
import useActivation from "../hooks/useActivation"

export const cssActivated = css`
  color: red;
  border: solid;
`

type Props = {
  children: Activatable
  action?: VoidFunction
  init?: ReactNode
}

const Activation: FC<Props> = (props) => {
  const [state, funcs] = useActivation(props)

  return (
    <div
      css={state.isActive && cssActivated}
      onClick={funcs.handleClick}
      data-testid="activation"
    >
      {cloneElement(props.children, { ref: state.ref })}
    </div>
  )
}

export default Activation
