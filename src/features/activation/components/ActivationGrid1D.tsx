import { css } from "@emotion/react"
import { useHotkeys } from "react-hotkeys-hook"

import { useActivation } from "../hooks"

import type { Activatables, Index } from "../types"
import type { SerializedStyles } from "@emotion/react"
import type { FC } from "react"

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
}

const ActivationGrid1D: FC<Props> = (props) => {
  const [plusKey, minusKey, style] = keyProps(props.styleType)
  const [st, fn] = useActivation({
    children: props.children,
    style,
    index: props.initialIndex ?? null,
  })

  useHotkeys(`${plusKey}`, fn.increment, {}, [st])
  useHotkeys(`${minusKey}`, fn.decrement, {}, [st])
  useHotkeys(`ctrl+${plusKey}`, fn.setLastIndex, {}, [st])
  useHotkeys(`ctrl+${minusKey}`, fn.setFirstIndex, {}, [st])
  useHotkeys("enter", fn.fireClick, {}, [st])

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
