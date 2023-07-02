import { useQuery, type UseQueryResult } from "@tanstack/react-query"

import type { ConceptWithStatistics } from "../types"
import type { AxiosError } from "axios"

import { axios } from "@/features/lib"



export const read = async (name: string): Promise<ConceptWithStatistics[]> => {
  const res = await axios.get(`/concepts?name=${name}`)
  return res.data
}

type ApiRetType = Awaited<ReturnType<typeof read>>
type RetType = UseQueryResult<ApiRetType, AxiosError>

export function useConceptsByName(name: string): RetType {
  return useQuery({
    queryKey: ["concepts", name],
    queryFn: async () => await read(name),
    enabled: name != null,
  })
}
