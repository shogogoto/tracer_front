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

  // きたねえ
  type T = HTMLDivElement
  const r1 = useHotkeys<T>(`right`, fn.incHorizontal, [st])
  const r2 = useHotkeys<T>(`left`, fn.decHorizontal, [st])
  const r3 = useHotkeys<T>(`down`, fn.incVertical, [st])
  const r4 = useHotkeys<T>(`up`, fn.decVertical, [st])
  const r5 = useHotkeys<T>(`ctrl+right`, fn.setLastHorizontal, [st])
  const r6 = useHotkeys<T>(`ctrl+left`, fn.setFirstHorizontal, [st])
  const r7 = useHotkeys<T>(`ctrl+down`, fn.setLastVertical, [st])
  const r8 = useHotkeys<T>(`ctrl+up`, fn.setFirstVertical, [st])
  const r9 = useHotkeys<T>("enter", fn.fireClick, [st])

  const refs = [r1, r2, r3, r4, r5, r6, r7, r8, r9]
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
