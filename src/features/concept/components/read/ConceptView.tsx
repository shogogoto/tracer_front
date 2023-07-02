import { forwardRef } from "react"

import ConceptItem from "./ConceptItem"
import ItemStatistics from "./ItemStatistics"

import type { ConceptWithStatistics } from "../../types"


type Props = {
  item: ConceptWithStatistics
}

const ConceptView = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <div ref={ref}>
      <ConceptItem
        isLineStyle={false}
        concept={props.item.item}
      />
      <ItemStatistics
        {...props.item.statistics}
        enableTooltipAtSolo={true}
      />
    </div>
  )
})
ConceptView.displayName = "ConceptView"

export default ConceptView
