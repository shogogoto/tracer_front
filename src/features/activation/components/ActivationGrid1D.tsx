import { css } from "@emotion/react"
import { forwardRef } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { mergeRefs } from "react-merge-refs"

import { useActivation1D } from "../hooks"

import type { Activatables, Index } from "../types"
import type { SerializedStyles } from "@emotion/react"
import type { FC, LegacyRef } from "react"

type StyleType = "horizon" | "vertical"

type StyleProps = [plusKey: string, minusKey: string, style: SerializedStyles]

const horizonStyle = css`
  display: flex;
  flex-wrap: nowrap;
`
const nonStyle = css``

const keyProps = (t: StyleType): StyleProps => {
  return t === "horizon"
    ? ["right", "left", horizonStyle]
    : ["down", "up", nonStyle]
}

type Props = {
  children: Activatables
  styleType: StyleType
  initialIndex?: Index
  ref?: LegacyRef<HTMLDivElement>
}

const ActivationGrid1D: FC<Props> = (props) => {
  const [plusKey, minusKey, style] = keyProps(props.styleType)
  const [st, fn] = useActivation1D({
    children: props.children,
    style,
    index: props.initialIndex ?? null,
  })

  type T = HTMLDivElement
  const ref1 = useHotkeys<T>(`${plusKey}`, fn.increment, [st])
  const ref2 = useHotkeys<T>(`${minusKey}`, fn.decrement, [st])
  const ref3 = useHotkeys<T>(`ctrl+${plusKey}`, fn.setLastIndex, [st])
  const ref4 = useHotkeys<T>(`ctrl+${minusKey}`, fn.setFirstIndex, [st])
  const ref5 = useHotkeys<T>("enter", fn.fireClick, [st])
  const refs = [ref1, ref2, ref3, ref4, ref5]
  const ref = mergeRefs<T>(refs)

  return (
    <div
      tabIndex={0}
      data-testid="activation-grid-1d"
      onBlur={fn.clear}
      ref={ref}
    >
      {st.wrapped}
    </div>
  )
}

export default ActivationGrid1D

export const ActivationGrid1DRef = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    return (
      <ActivationGrid1D
        {...props}
        ref={ref}
      />
    )
  }
)
ActivationGrid1DRef.displayName = "ActivationGrid1DRef"
