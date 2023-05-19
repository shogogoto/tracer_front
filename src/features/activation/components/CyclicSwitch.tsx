import type { FC, ReactNode } from "react"
import { useKey } from "react-use"

import { useRotateChildren } from "../hooks"

type Props = {
  children: ReactNode
}

const CyclicSwitch: FC<Props> = (props) => {
  const [st, fn] = useRotateChildren(props.children)
  useKey("Enter", fn.increment, {}, [st.child])

  return (
    <div
      onClick={fn.increment}
      data-testid="cycle-switch"
    >
      {st.child}
    </div>
  )
}

export default CyclicSwitch
