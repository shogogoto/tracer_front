import { zodResolver } from "@hookform/resolvers/zod"
import { type BaseSyntheticEvent } from "react"
import {
  useForm,
  type UseFormRegister,
  type UseFormReturn,
  type SubmitHandler,
} from "react-hook-form"
import { z } from "zod"

import { useSaveConcept } from "../api"
import { wrapAsync } from "../utils"

import type { CreateResult } from "../api"


const schema = z.object({
  name: z
    .string()
    .min(1, "名前は１文字以上を入力してください")
    .max(30, "名前は30文字以下を入力してください"),
  description: z.string().max(140, "説明は140字以下を入力してください"), // Twitter参考
  uid: z.string().optional(),
})

export type ConceptFormType = z.infer<typeof schema>
export type ConceptFormRegister = UseFormRegister<ConceptFormType>

type RetType = UseFormReturn<ConceptFormType> & {
  onSubmit: (ev?: BaseSyntheticEvent) => void
  mutation: CreateResult
}

const useConceptForm = (defaultValues: ConceptFormType): RetType => {
  const methods = useForm<ConceptFormType>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const mutation = useSaveConcept()

  const onValid: SubmitHandler<ConceptFormType> = (d) => {
    mutation.mutate(d)
  }

  return {
    ...methods,
    onSubmit: wrapAsync(methods.handleSubmit(onValid)),
    mutation,
  }
}

export default useConceptForm
