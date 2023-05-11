import type { FC } from "react"
import { useKey } from "react-use"

import type { CyclicSwitchProps } from "../types"
import useRotateChildren from "../hooks/useRotateChildren"

const CyclicSwitch: FC<CyclicSwitchProps> = (props) => {
  const { child, increment } = useRotateChildren(props.children)

  function handleClick(): void {
    increment()
  }

  function handleKeyDown(): void {
    increment()
  }

  useKey("Enter", handleKeyDown, {}, [child])

  return (
    <div
      onClick={handleClick}
      data-testid="cycle-switch"
    >
      {child}
    </div>
  )
}

export default CyclicSwitch
