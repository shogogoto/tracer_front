// import { renderHook } from "@testing-library/react"
// import { render } from "@testing-library/react"
import { type ReactNode } from "react"

import { countChildren } from "./useCyclicSwitch"

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

// describe("", () => {