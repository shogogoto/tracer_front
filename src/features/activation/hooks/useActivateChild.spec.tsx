import { renderHook } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import flattenChildren from "react-flatten-children"
import isEqual from "react-fast-compare"
import type { ReactNode } from "react"

import useActivateChild from "./useActivateChild"

const e = (
  <>
    <p>0</p>
    <p>1</p>
    <p>2</p>
  </>
)

describe("useActivateChild", () => {
  test("activate child", () => {
    const children = flattenChildren(e)
    const { result } = renderHook(() => useActivateChild(e))
    expect(result.current.activated).toBeNull()

    function check(i: number): void {
      act(() => {
        result.current.activate(children[i])
      })
      expect(isEqual(result.current.activated, children[i])).toBeTruthy()
    }

    check(0)
    check(1)
    check(2)

    act(() => {
      result.current.deactivate()
    })
    expect(result.current.activated).toBeNull()
  })

  test("activate not child", () => {
    const { result } = renderHook(() => useActivateChild(e))
    function activate(n: ReactNode) {
      return (): void => {
        act(() => {
          result.current.activate(n)
        })
      }
    }

    expect(activate(null)).toThrowError()
    expect(activate(undefined)).toThrowError()
  })
})
