import type { FC, ReactNode } from "react"
import { useKey } from "react-use"

import { useRotateChildren } from "../hooks"

type Props = {
  children: ReactNode
}

const CyclicSwitch: FC<Props> = (props) => {
  const [child, funcs] = useRotateChildren(props.children)
  useKey("Enter", funcs.increment, {}, [child])

  return (
    <div
      onClick={funcs.increment}
      data-testid="cycle-switch"
    >
      {child}
    </div>
  )
}

export default CyclicSwitch
