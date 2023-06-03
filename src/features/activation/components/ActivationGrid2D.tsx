import { useHotkeys } from "react-hotkeys-hook"
import { mergeRefs } from "react-merge-refs"

import { useActivation2D } from "../hooks"

import type { Activatables } from "../types"
import type { FC } from "react"

type Props = {
  children: Activatables
  foldSize: number
}

const ActivationGrid2D: FC<Props> = (props) => {
  const [st, fn] = useActivation2D(props)

  type T = HTMLDivElement
  const ref1 = useHotkeys<T>(`right`, fn.incHorizontal, [st])
  const ref2 = useHotkeys<T>(`left`, fn.decHorizontal, [st])
  const ref3 = useHotkeys<T>(`down`, fn.incVertical, [st])
  const ref4 = useHotkeys<T>(`up`, fn.decVertical, [st])
  const ref5 = useHotkeys<T>("enter", fn.fireClick, [st])
  const refs = [ref1, ref2, ref3, ref4, ref5]
  const ref = mergeRefs<T>(refs)

  return (
    <div
      tabIndex={0}
      data-testid="activation-grid-2d"
      onBlur={fn.clear}
      ref={ref}
    >
      {st.wrapped}
    </div>
  )
}

export default ActivationGrid2D
