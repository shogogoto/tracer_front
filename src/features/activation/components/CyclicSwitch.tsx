import type { FC, ReactNode } from "react"
import { useKey } from "react-use"

import { useRotateChildren } from "../hooks"

type Props = {
  children: ReactNode
}

const CyclicSwitch: FC<Props> = (props) => {
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
