import { css } from "@emotion/react"

import { TipDistance } from "./TipDistance"
import { TreeCount } from "./TreeCount"

import type { DependencyStatistics } from "../../types"
import type { FC } from "react"


const itemStatsParent = css`
  // display: flex;
  // flex-wrap: wrap;

  > a {
    text-align: center;
    padding: 1rem;
  }
`

type Props = {
  enableTooltipAtSolo?: boolean
} & DependencyStatistics

const ItemStatistics: FC<Props> = (props) => {
  const enable = props.enableTooltipAtSolo ?? false

  return (
    <div css={itemStatsParent}>
      <TreeCount
        neighborUpperCount={props.lower_neighbor_count}
        allUpperCount={props.all_upper_count}
        neighborLowerCount={props.lower_neighbor_count}
        allLowerCount={props.all_upper_count}
        enableTooltipAtSolo={enable}
      />
      <TipDistance
        fromLeaf={props.max_distance_from_leaves}
        fromRoot={props.max_distance_from_roots}
        enableTooltipAtSolo={enable}
      />
    </div>
  )
}

export default ItemStatistics
