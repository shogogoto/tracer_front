import { useMutation } from "@tanstack/react-query"

import type { CreatedConcept } from "../types"
import type { UseMutationResult } from "@tanstack/react-query"
import type { AxiosResponse, AxiosError } from "axios"

import { axios } from "@/features/lib"


export const delete_ = async (
  uid: CreatedConcept["uid"]
): Promise<AxiosResponse> => {
  const res = await axios.delete(`/concepts/${uid}`)
  return res
}

type ApiRetType = Awaited<ReturnType<typeof delete_>>
export type DeleteResult = UseMutationResult<ApiRetType, AxiosError, string>

export function useUpdateConcept(): DeleteResult {
  return useMutation({
    mutationFn: delete_,
  })
}
