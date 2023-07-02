import { useMutation } from "@tanstack/react-query"

import type { ConceptFormType } from "../hooks"
import type { UseMutationResult } from "@tanstack/react-query"
import type { AxiosResponse, AxiosError } from "axios"

import { axios } from "@/features/lib"


type ApiType = (data: ConceptFormType) => Promise<AxiosResponse>

export const save: ApiType = async (data) => {
  return data.uid == null
    ? await axios.post(`/concepts`, data)
    : await axios.put(`/concepts`, data)
}

type ApiRetType = Awaited<ReturnType<typeof save>>
export type CreateResult = UseMutationResult<
  ApiRetType,
  AxiosError,
  ConceptFormType
>

export function useSaveConcept(): CreateResult {
  return useMutation({
    mutationFn: save,
  })
}
