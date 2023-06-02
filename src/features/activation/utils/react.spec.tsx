import React from "react"
import { type ReactNode } from "react"
import flattenChildren from "react-flatten-children"

import { countChildren, indexChild } from "./react"

const e1 = <div></div>
const e2 = (
  <div>
    <div></div>
    <div></div>
  </div>
)
const e3 = (
  <>
    <>
      <div></div>
      <div></div>
    </>
  </>
)

describe.each<[ReactNode, number, string]>([
  [e1, 0, "empty"],
  [e2, 2, "two children"],
  [e3, 2, "fragment"],
  [1, 1, "number"],
  ["", 1, "string"],
  [null, 0, "null"],
  [undefined, 0, "undefined"],
])("countChildren", (x, expected, caseName) => {
  test(`parameterize ${caseName}`, () => {
    expect(countChildren(x)).toBe(expected)
  })
})

describe("indexChild", () => {
  const children = flattenChildren(e3)

  test("", () => {
    expect(indexChild(e3, children[0])).toBe(0)
    expect(indexChild(e3, children[1])).toBe(1)
    expect(indexChild(e3, null)).toBeNull()
    expect(indexChild(e3, undefined)).toBeNull()
    expect(indexChild(e3, <div />)).toBeNull()
  })
})
