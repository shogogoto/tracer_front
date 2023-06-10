import { GiPathDistance } from "react-icons/gi"
import { Tooltip } from "react-tooltip"

import type { FC } from "react"

type DistProps = {
  fromLeaf: number
  fromRoot: number
  enableTooltipAtSolo?: boolean
}

export const TipDistance: FC<DistProps> = (props) => {
  const enable = props.enableTooltipAtSolo ?? false
  return (
    <a
      data-tooltip-id="tip-distance-tooltip"
      data-tooltip-content="最大依存元距離 最大依存先距離"
    >
      {props.fromRoot}
      <GiPathDistance />
      {props.fromLeaf}
      {enable && TipDistanceToolTip}
    </a>
  )
}

export const TipDistanceToolTip = <Tooltip id="tip-distance-tooltip" />
