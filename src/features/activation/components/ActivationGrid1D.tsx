import { css } from "@emotion/react"
import { useKey } from "react-use"

import { useActivation } from "../hooks"

import type { Activatables, Index } from "../types"
import type { SerializedStyles } from "@emotion/react"
import type { FC } from "react"
import type { KeyFilter } from "react-use/lib/useKey"

type StyleType = "horizon" | "vertical"

type StyleProps = [
  positiveKey: string,
  negativeKey: string,
  style: SerializedStyles
]

const horizonStyle = css`
  display: flex;
  flex-wrap: nowrap;
`
const nonStyle = css``

const keyProps = (t: StyleType): StyleProps => {
  return t === "horizon"
    ? ["ArrowRight", "ArrowLeft", horizonStyle]
    : ["ArrowDown", "ArrowUp", nonStyle]
}

const withCtrlKeyFilter = (key: string): KeyFilter => {
  return (ev) => ev.ctrlKey && ev.key === key
}

type Props = {
  children: Activatables
  styleType: StyleType
  initialIndex?: Index
}

const ActivationGrid1D: FC<Props> = (props) => {
  const [positiveKey, negativeKey, style] = keyProps(props.styleType)
  const [st, fn] = useActivation({
    children: props.children,
    style,
    index: props.initialIndex ?? null,
  })

  useKey(positiveKey, fn.increment, {}, [st])
  useKey(negativeKey, fn.decrement, {}, [st])
  useKey(withCtrlKeyFilter(positiveKey), fn.setLastIndex, {}, [st])
  useKey(withCtrlKeyFilter(negativeKey), fn.setFirstIndex, {}, [st])

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
