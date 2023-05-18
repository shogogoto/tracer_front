import type { FC } from "react"

import type { Activatable } from "../types"
import { useActivation } from "../hooks"

type Props = {
  children: Activatable
  initStyled?: boolean
}

const Activation: FC<Props> = (props) => {
  const [s] = useActivation(props)
  return s.activationElement
}

export default Activation
