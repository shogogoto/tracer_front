import { css } from "@emotion/react"
import { useKey } from "react-use"

import { useActivation } from "../hooks"

import type { Activatables } from "../types"
import type { SerializedStyles } from "@emotion/react"
import type { FC } from "react"

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

type Props = {
  children: Activatables
  styleType: StyleType
}

const ActivationGrid1D: FC<Props> = (props) => {
  const [positiveKey, negativeKey, style] = keyProps(props.styleType)
  const [st, fn] = useActivation({
    children: props.children,
    style,
  })

  useKey(positiveKey, fn.increment, {}, [st])
  useKey(negativeKey, fn.decrement, {}, [st])
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
