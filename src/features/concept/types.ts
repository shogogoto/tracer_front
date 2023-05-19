export interface ConceptProps {
  name: string
  description: string
}

// interfaceだとComponent Propsの型として認識されない
export interface Concept extends ConceptProps {
  uid: string
}

export interface DependencyStatistics {
  upper_neighber_count: number
  lower_neighbor_count: number
  all_upper_count: number
  all_lower_count: number
  max_distance_from_roots: number
  max_distance_from_leaves: number
}

export type ConceptWithStatistics = {
  concept: Concept
  statistics: DependencyStatistics
}
