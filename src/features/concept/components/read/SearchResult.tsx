import { useState } from "react"

import ConceptView from "./ConceptView"
import SearchResultConfig from "./SearchResultConfig"
import ErrorText from "../ErrorText"

import type { ConceptWithStatistics } from "../../types"
import type { FC } from "react"

import ActivationGrid2D from "@/features/activation/components/ActivationGrid2D"
import { type Activatables } from "@/features/activation/types"


type Props = {
  isLoading: boolean
  errorMessage?: string
  data?: ConceptWithStatistics[]
}

const SearchResult: FC<Props> = (props) => {
  const [size, setSize] = useState(3)

  if (props.isLoading) return <div>Loading...</div>

  if (props.errorMessage != null)
    return <ErrorText message={props.errorMessage} />

  const children: Activatables =
    props.data?.map((v) => {
      return (
        <ConceptView
          item={v}
          key={v.item.uid}
        />
      )
    }) ?? []

  return (
    <div>
      <SearchResultConfig
        size={size}
        setSize={setSize}
      />
      <ActivationGrid2D foldSize={size}>{children}</ActivationGrid2D>
    </div>
  )
}

export default SearchResult
