import type { FC } from "react"
import { useKey } from "react-use"

import type { CyclicSwitchProps } from "../types"
import useCyclicSwitch from "../hooks/useCyclicSwitch"

const CyclicSwitch: FC<CyclicSwitchProps> = (props) => {
  const { child, cycle } = useCyclicSwitch(props.children)

  function handleClick(): void {
    cycle()
  }

  function handleKeyDown(): void {
    cycle()
  }

  useKey("Enter", handleKeyDown, {}, [child])

  return (
    <div onClick={handleClick} data-testid="cycle-switch">
      {child}
    </div>
  )
}

export default CyclicSwitch
