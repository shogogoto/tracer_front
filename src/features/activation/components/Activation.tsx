import type { FC } from "react"
import { css } from "@emotion/react"

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

const Activation: FC<Props> = (props) => {
  const [state, funcs] = useForwardClick(props.children)

  const [st, fns] = useStyle({
    n: state.forwardElement,
    initStyled: props.initStyled ?? false,
    css: cssActivated,
  })

  const handleClick: VoidFunction = () => {
    fns.toggleStyle()
    funcs.forwardClick()
  }

  return <div onClick={handleClick}>{st.styledElement}</div>
}

export default Activation
