import { css } from "@emotion/react"
import { type ComponentProps } from "react"
import { forwardRef } from "react"
import { FaSearch } from "react-icons/fa"

import ErrorText from "./ErrorText"

type Props = ComponentProps<"input"> &
  Partial<{
    error: string
    submitButton: boolean
  }>

const id = "search-by-name"
export const placeHolder = "search concepts by name"

export const SearchNameInput = forwardRef<HTMLInputElement, Props>(
  (props, ref) => (
    <div>
      <div css={searchBarStyle}>
        <label htmlFor={id}>
          <FaSearch css={iconStyle} />
        </label>
        <input
          id={id}
          {...props}
          type="search"
          value={props.value}
          placeholder={placeHolder}
          ref={ref}
        />
        {props.submitButton != null && <button type="submit">検索</button>}
      </div>
      <ErrorText message={props.error} />
    </div>
  )
)

SearchNameInput.displayName = "SearchNameInputRef"
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
  }

  > button {
    width: 4rem;
    border-radius: 999px;
    background-color: #ccffff;
    border: 1px solid lightgray;
  }
`

const iconStyle = css`
  margin-right: 5px;
`
