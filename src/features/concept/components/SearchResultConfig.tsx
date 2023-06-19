import { css } from "@emotion/react"

import type { ChangeEventHandler, FC, SetStateAction, Dispatch } from "react"


type Props = {
  size: number
  setSize: Dispatch<SetStateAction<number>>
  // groupBy?:
}

type Handler = ChangeEventHandler<HTMLInputElement>

const style = css`
  width: 2rem;
`

const SearchResultConfig: FC<Props> = (props) => {
  const handleChange: Handler = (ev) => {
    const next = Number.parseInt(ev.target.value)
    props.setSize(next)
  }

  return (
    <div>
      <input
        type="number"
        min={1}
        value={props.size}
        onChange={handleChange}
        css={style}
      />
    </div>
  )
}

export default SearchResultConfig
