import { css } from "@emotion/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { type FC } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import SearchNameInput from "./SearchNameInput"
import SearchResult from "./SearchResult"

import { useConceptsByName } from "@/features/concept/api"
import { wrapAsync } from "@/features/concept/utils"


const schema = z.object({
  searchName: z.string().min(1),
})
type FormType = z.infer<typeof schema>

const SearchBar: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  })

  const { searchName } = getValues()
  const result = useConceptsByName(searchName)

  const onValid: SubmitHandler<FormType> = (_) => {}

  return (
    <div>
      <form
        css={style}
        onSubmit={wrapAsync(handleSubmit(onValid))}
      >
        <SearchNameInput
          {...register("searchName")}
          error={errors.searchName?.message}
        />
      </form>
      <SearchResult
        isLoading={result.isLoading}
        errorMessage={result.error?.message}
        data={result.data}
      />
    </div>
  )
}

export default SearchBar

const style = css`
  display: flex;
`
