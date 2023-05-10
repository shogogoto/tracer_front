import { renderHook } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import { type ReactNode } from "react"
import flattenChildren from "react-flatten-children"

import useCyclicSwitch, { countChildren } from "./useCyclicSwitch"

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

describe("useCyclicSwitch", () => {
  test("not element", () => {
    const e = "string"
    const { result } = renderHook(() => useCyclicSwitch(e))

    expect(result.current.child).toBeNull()
    act(() => {
      result.current.cycle()
    })
    expect(result.current.child).toBeNull()
  })

  test("no children", () => {
    const e = <div></div>
    const { result } = renderHook(() => useCyclicSwitch(e))

    expect(result.current.child).toBeNull()
    act(() => {
      result.current.cycle()
    })
    expect(result.current.child).toBeNull()
  })

  test("3 children", () => {
    const e = (
      <>
        <>
          <p>1</p>
          <p>2</p>
          <p>3</p>
        </>
      </>
    )
    const { result } = renderHook(() => useCyclicSwitch(e))

    const children = flattenChildren(e)
    expect(result.current.child).toEqual(children[0])
    act(() => {
      result.current.cycle()
    })
    expect(result.current.child).toEqual(children[1])
    act(() => {
      result.current.cycle()
    })
    expect(result.current.child).toEqual(children[2])
    act(() => {
      result.current.cycle()
    })
    expect(result.current.child).toEqual(children[0])
  })
})
