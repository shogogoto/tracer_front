import ErrorText from "./ErrorText"

import type { FC } from "react"


type Props = {
  isPending: boolean
  errorMessage?: string
  successMessage?: string | boolean
}

const MutationResult: FC<Props> = (props) => {
  if (props.isPending) return <div>Pending...</div>

  if (props.errorMessage != null)
    return <ErrorText message={props.errorMessage} />

  return <div>{props.successMessage}</div>
}

export default MutationResult
