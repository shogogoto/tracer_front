import axios from "axios"

import type { ConceptWithStatistics } from "../types"

const baseUrl = import.meta.env.VITE_BACKEND_URI as string

// type ReturnType = Promise<AxiosResponse<ConceptWithStatistics[]>>
type ReturnType = Promise<ConceptWithStatistics[]>

const useConceptListByName = async (name: string): ReturnType => {
  const url = `${baseUrl}/concepts?name=${name}`
  // const url = `${baseUrl}/concepts`
  return await axios.get(url).then((res) => {
    // .then( (res:AxiosResponse<ConceptWithStatistics[]>) => {
    return res.data
  })
}

export default useConceptListByName
