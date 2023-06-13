import { css } from "@emotion/react"
import { type ComponentProps, type FC, type Ref } from "react"
import { FaSearch } from "react-icons/fa"

type Props = ComponentProps<"input"> &
  Partial<{
    value: string
    onChange: (value: string) => void
    onBlur: () => void
    ref: Ref<HTMLInputElement>
  }>

const defaultOnChange = (v: string): void => {}

const SearchNameInput: FC<Props> = (props) => {
  const onChange = props.onChange ?? defaultOnChange

  return (
    <div css={searchBarStyle}>
      <FaSearch css={iconStyle} />
      <input
        {...props}
        type="search"
        value={props.value}
        placeholder="search concepts by name"
        onChange={(ev) => {
          onChange(ev.target.value)
        }}
        onBlur={props.onBlur}
        ref={props.ref}
      />
    </div>
  )
}

export default SearchNameInput

const WIDTH = "15rem"

const searchBarStyle = css`
  justify-content: center;
  display: flex;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 999px;
  background-color: #f0f2f5; // Facebookの検索フォームと同じ色らしい
  width: ${WIDTH};

  > input {
    display: flex;
    border: none !important;
    background-color: #f0f2f5;
    width: ${WIDTH};
  }

  > input:focus {
    outline-width: 0; // focus時の枠を消す
  }

  > input::placeholder {
    text-align: left;
    font-size: 15px;
  }
`

const iconStyle = css`
  margin-right: 5px;
`
