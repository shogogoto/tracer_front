import { v4 as uuid } from "uuid"

import type { Concept, DependencyStatistics } from "@/features/concept/types"

type Name = Concept["name"]
type Desc = Concept["description"]

export const one = (name: Name, description: Desc = ""): Concept => {
  return {
    name,
    description,
    uid: uuid().replace(/-/g, ""),
  }
}

export const stats = (
  upperNeighborCount = 0,
  lowerNeighborCount = 0,
  allUpperCount = 0,
  allLowerCount = 0,
  maxDistanceFromRoots = 0,
  maxDistanceFromLeaves = 0
): DependencyStatistics => {
  return {
    upper_neighbor_count: upperNeighborCount,
    lower_neighbor_count: lowerNeighborCount,
    all_upper_count: allUpperCount,
    all_lower_count: allLowerCount,
    max_distance_from_roots: maxDistanceFromRoots,
    max_distance_from_leaves: maxDistanceFromLeaves,
  }
}
