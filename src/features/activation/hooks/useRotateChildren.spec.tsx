import { renderHook } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import flattenChildren from "react-flatten-children"

import useRotateChildren, { type ReturnType } from "./useRotateChildren"

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
    dec(result.current)
    expect(result.current.child).toEqual(children[2])
  })
})
