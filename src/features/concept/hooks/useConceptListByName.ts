// import BACKEND from "@/features/api"
import axios from "axios"
import { type AxiosResponse } from "axios"

interface DependencyStatistics {
  upper_neighber_count: number
  lower_neighbor_count: number
  all_upper_count: number
  all_lower_count: number
  max_distance_from_roots: number
  max_distance_from_leaves: number
}

interface Concept {
  name: string
  description: string
  uid: string
}

interface ConceptWithStatistics {
  concept: Concept
  statistics: DependencyStatistics
}

const baseUrl = import.meta.env.VITE_BACKEND_URI as string

type ReturnType = Promise<AxiosResponse<ConceptWithStatistics[]>>

const useConceptListByName = async (name: string): ReturnType => {
  const url = `${baseUrl}/concepts?name=${name}`
  // const url = `${baseUrl}/concepts`
  return await axios.get(url).then((res) => {
    // .then( (res:AxiosResponse<ConceptWithStatistics[]>) => {
    return res.data
  })
}

export default useConceptListByName
