import type { FC } from "react"
import { useKey } from "react-use"

import type { CyclicSwitchProps } from "../types"
import useRotateChildren from "../hooks/useRotateChildren"

const CyclicSwitch: FC<CyclicSwitchProps> = (props) => {
  const { child, increment } = useRotateChildren(props.children)
  useKey("Enter", increment, {}, [child])

  return (
    <div
      onClick={increment}
      data-testid="cycle-switch"
    >
      {child}
    </div>
  )
}

export default CyclicSwitch
