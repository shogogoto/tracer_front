export interface ConceptProps {
  name: string
  description: string
}

// interfaceだとComponent Propsの型として認識されない
export type Concept = ConceptProps & {
  uid: string
}

export type CreatedConcept = ConceptProps & {
  uid: string
}

export type DepNeighborCount = {
  upper: number
  lower: number
}

export type DepDistances = {
  fromRoot: number
  fromLeaves: number
}

export interface DependencyStatistics {
  upper_neighbor_count: number
  lower_neighbor_count: number
  all_upper_count: number
  all_lower_count: number
  max_distance_from_roots: number
  max_distance_from_leaves: number
}

export type ConceptWithStatistics = {
  item: Concept
  statistics: DependencyStatistics
}
