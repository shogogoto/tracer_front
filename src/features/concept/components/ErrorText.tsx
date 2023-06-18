import { css } from "@emotion/react"

import type { FC } from "react"

const style = css`
  color: red;
`

type Props = {
  message?: string
}

const ErrorText: FC<Props> = (props) => {
  return <p css={style}>{props.message}</p>
}

export default ErrorText
