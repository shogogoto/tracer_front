import { renderHook } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import flattenChildren from "react-flatten-children"

import useRotateChildren, { type ReturnType } from "./useRotateChildren"

describe("useRotationChildren", () => {
  test("one element", () => {
    const e = "string"
    const { result } = renderHook(() => useRotateChildren(e))

    expect(result.current[0].child).toBe(e)
    inc(result.current)
    expect(result.current[0].child).toBe(e)
    inc(result.current)
    expect(result.current[0].child).toBe(e)
    dec(result.current)
    expect(result.current[0].child).toBe(e)
    dec(result.current)
    expect(result.current[0].child).toBe(e)
  })

  test("3 elements", () => {
    const { result } = renderHook(() => useRotateChildren(e3))
    const children = flattenChildren(e3)

    expect(result.current[0].child).toEqual(children[0])
    inc(result.current)
    expect(result.current[0].child).toEqual(children[1])
    inc(result.current)
    expect(result.current[0].child).toEqual(children[2])
    inc(result.current)
    expect(result.current[0].child).toEqual(children[0])
    dec(result.current)
    expect(result.current[0].child).toEqual(children[2])
    dec(result.current)
    expect(result.current[0].child).toEqual(children[1])
    dec(result.current)
    expect(result.current[0].child).toEqual(children[0])
    dec(result.current)
    expect(result.current[0].child).toEqual(children[2])
  })

  test("set index by direct", () => {
    const { result } = renderHook(() => useRotateChildren(e3))
    const children = flattenChildren(e3)
    function setIndex(i: number): void {
      act(() => {
        result.current[1].setIndex(i)
      })
    }

    setIndex(0)
    expect(result.current[0].child).toEqual(children[0])
    setIndex(2)
    expect(result.current[0].child).toEqual(children[2])
    setIndex(1)
    expect(result.current[0].child).toEqual(children[1])

    expect(() => {
      setIndex(999)
    }).toThrowError()
    expect(result.current[0].child).toEqual(children[1]) // child wont change
  })

  const e3 = (
    <>
      <p>1</p>
      <p>2</p>
      <p>3</p>
    </>
  )

  function inc(ret: ReturnType): void {
    act(() => {
      ret[1].increment()
    })
  }

  function dec(ret: ReturnType): void {
    act(() => {
      ret[1].decrement()
    })
  }
})
