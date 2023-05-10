import type { FC } from "react"

import type { CyclicSwitchProps } from "../types"
import useCyclicSwitch from "../hooks/useCyclicSwitch"

const CyclicSwitch: FC<CyclicSwitchProps> = (props) => {
  const { child, cycle } = useCyclicSwitch(props.children)

  function handleClick(): void {
    cycle()
  }

  return <div onClick={handleClick}>{child}</div>
}

export default CyclicSwitch
