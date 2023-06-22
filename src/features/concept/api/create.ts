import { useMutation } from "@tanstack/react-query"


import type { ConceptProps } from "../types"
import type { UseMutationResult } from "@tanstack/react-query"
import type { AxiosResponse, AxiosError } from "axios"

import { axios } from "@/features/lib"



export const create = async (data: ConceptProps): Promise<AxiosResponse> => {
  const res = await axios.post(`/concepts`, data)
  return res
}

type ApiRetType = Awaited<ReturnType<typeof create>>
export type CreateResult = UseMutationResult<
  ApiRetType,
  AxiosError,
  ConceptProps
>

export function useCreateConcept(): CreateResult {
  return useMutation({
    mutationFn: create,
  })
}
