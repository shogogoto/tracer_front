import { renderHook } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import { type ReactNode } from "react"
import flattenChildren from "react-flatten-children"

import useRotateChildren, {
  countChildren,
  type ReturnType,
} from "./useRotateChildren"

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
  function inc(ret: ReturnType): void {
    act(() => {
      ret.increment()
    })
  }

  function dec(ret: ReturnType): void {
    act(() => {
      ret.decrement()
    })
  }

  test("not element", () => {
    const e = "string"
    const { result } = renderHook(() => useRotateChildren(e))

    expect(result.current.child).toBeNull()
    inc(result.current)
    expect(result.current.child).toBeNull()
    dec(result.current)
    expect(result.current.child).toBeNull()
  })

  test("no children", () => {
    const e = <div></div>
    const { result } = renderHook(() => useRotateChildren(e))

    expect(result.current.child).toBeNull()
    inc(result.current)
    expect(result.current.child).toBeNull()
    dec(result.current)
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
    const { result } = renderHook(() => useRotateChildren(e))

    const children = flattenChildren(e)
    expect(result.current.child).toEqual(children[0])
    inc(result.current)
    expect(result.current.child).toEqual(children[1])
    inc(result.current)
    expect(result.current.child).toEqual(children[2])
    inc(result.current)
    expect(result.current.child).toEqual(children[0])
    dec(result.current)
    expect(result.current.child).toEqual(children[2])
    dec(result.current)
    expect(result.current.child).toEqual(children[1])
    dec(result.current)
    expect(result.current.child).toEqual(children[0])
  })
})
