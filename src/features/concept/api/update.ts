import { useMutation } from "@tanstack/react-query"

import type { CreatedConcept } from "../types"
import type { UseMutationResult } from "@tanstack/react-query"
import type { AxiosResponse, AxiosError } from "axios"

import { axios } from "@/features/lib"


export const update = async (data: CreatedConcept): Promise<AxiosResponse> => {
  const res = await axios.put(`/concepts`, data)
  return res
}

type ApiRetType = Awaited<ReturnType<typeof update>>
export type UpdateResult = UseMutationResult<
  ApiRetType,
  AxiosError,
  CreatedConcept
>

export function useUpdateConcept(): UpdateResult {
  return useMutation({
    mutationFn: update,
  })
}
