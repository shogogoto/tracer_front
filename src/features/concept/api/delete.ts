import { useMutation } from "@tanstack/react-query"

import type { CreatedConcept } from "../types"
import type { UseMutationResult } from "@tanstack/react-query"
import type { AxiosResponse, AxiosError } from "axios"

import { axios } from "@/features/lib"


type Props = Pick<CreatedConcept, "uid">

export const delete_ = async (props: Props): Promise<AxiosResponse> => {
  const res = await axios.delete(`/concepts/${props.uid}`)
  return res
}

type ApiRetType = Awaited<ReturnType<typeof delete_>>
export type DeleteResult = UseMutationResult<ApiRetType, AxiosError, Props>

export function useDeleteConcept(): DeleteResult {
  return useMutation({
    mutationFn: delete_,
  })
}
