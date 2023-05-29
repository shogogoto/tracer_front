import React from "react"
import { renderHook } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import flattenChildren from "react-flatten-children"

import useRotateChildren, { type ReturnType } from "./useRotateChildren"
import { rotatableToArray } from "../utils"

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

const e3 = (
  <>
    <p>1</p>
    <p>2</p>
    <p>3</p>
  </>
)

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

  test("set index by child", () => {
    const children = rotatableToArray(e3)
    const { result } = renderHook(() => useRotateChildren(children))
    function assertSetChild(i: number): void {
      const c = children[i]
      act(() => {
        result.current[1].setChild(c)
      })
      expect(result.current[0].child).toEqual(c)
    }

    assertSetChild(0)
    assertSetChild(2)
    assertSetChild(1)

    expect(() => {
      assertSetChild(999)
    }).toThrowError()
    expect(result.current[0].child).toEqual(children[1]) // child wont change
  })

  test("first index null", () => {
    const { result } = renderHook(() => useRotateChildren([]))
    expect(result.current[0].firstIndex).toBeNull()
  })

  test("first index null", () => {
    const children = rotatableToArray(e3)
    const { result } = renderHook(() => useRotateChildren(children))
    expect(result.current[0].firstIndex).toBe(0)
  })

  test("last index null", () => {
    const { result } = renderHook(() => useRotateChildren([]))
    expect(result.current[0].lastIndex).toBeNull()
  })

  test("last index null", () => {
    const children = rotatableToArray(e3)
    const { result } = renderHook(() => useRotateChildren(children))
    expect(result.current[0].lastIndex).toBe(children.length - 1)
  })
})
