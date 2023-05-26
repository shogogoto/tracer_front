import * as React from "react"
import { useKey } from "react-use"

import { useActivation } from "../hooks"

import type { Activatables } from "../types"
import type { FC } from "react"

type Props = {
  children: Activatables
  action?: VoidFunction
}

const ActivationGrid1D: FC<Props> = (props) => {
  const [st, fn] = useActivation({ children: props.children })

  useKey("ArrowRight", fn.increment, {}, [st])
  useKey("ArrowLeft", fn.decrement, {}, [st])
  useKey("Enter", fn.fireClick, {}, [st])
  return (
    <div
      tabIndex={0}
      data-testid="activation-grid-1d"
      onBlur={fn.clear}
    >
      {st.wrapped}
    </div>
  )
}

export default ActivationGrid1D
