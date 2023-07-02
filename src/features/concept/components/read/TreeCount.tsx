import { FaTree } from "react-icons/fa"
import { Tooltip } from "react-tooltip"

import type { FC } from "react"


type TreeProps = {
  neighborUpperCount: number
  neighborLowerCount: number
  allUpperCount: number
  allLowerCount: number
  enableTooltipAtSolo?: boolean
}

export const TreeCount: FC<TreeProps> = (props) => {
  const enable = props.enableTooltipAtSolo ?? false
  return (
    <a
      data-tooltip-id="tree-count-tooltip"
      data-tooltip-content="依存元:隣接数/総数 依存先:隣接数/総数"
    >
      {props.neighborLowerCount}/{props.allLowerCount}
      <FaTree />
      {props.neighborUpperCount}/{props.allUpperCount}
      {enable && TreeCountToolTip}
    </a>
  )
}

export const TreeCountToolTip = <Tooltip id="tree-count-tooltip" />
