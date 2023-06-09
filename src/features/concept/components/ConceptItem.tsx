import { css } from "@emotion/react"

import type { Concept } from "../types"
import type { FC } from "react"

const line = css`
  display: grid;
  grid-template-columns: 15rem 1fr; // 辞書の用例の文字数は，平均19.7文字
  word-break: break-all; // 文字単位で折り返し
  // overflow-wrap: break-word; // 単語単位で折り返し
  border: 1px solid black;

  > div {
    // box-sizing: border-box;
    // border: 3px solid grey;
    // border-radius: 16px;
    padding: 1rem;
  }
`

const card = css`
  border: 1px solid black;
  width: 20rem;
  padding: 1rem;
`

const nameEmphasis = css`
  font-weight: bold;
`

type Props = {
  isLineStyle: boolean
  concept: Concept
}

const ConceptItem: FC<Props> = (props) => {
  return (
    <div css={props.isLineStyle ? line : card}>
      <div hidden>{props.concept.uid}</div>
      <div css={nameEmphasis}>{props.concept.name}</div>
      <div>{props.concept.description}</div>
    </div>
  )
}

export default ConceptItem
