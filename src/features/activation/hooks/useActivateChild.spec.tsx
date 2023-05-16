import { renderHook } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import flattenChildren from "react-flatten-children"
import type { ReactNode, ReactElement } from "react"

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
    expect(result.current[0]).toBeNull()

    function check(i: number): void {
      expect(result.current[1].isActivated(children[i])).toBeFalsy()
      act(() => {
        result.current[1].activate(children[i] as ReactElement)
      })
      expect(result.current[1].isActivated(children[i])).toBeTruthy()
    }

    check(0)
    check(1)
    check(2)

    act(() => {
      result.current[1].deactivate()
    })
    expect(result.current[0]).toBeNull()
  })

  test("activate not child", () => {
    const { result } = renderHook(() => useActivateChild(e))
    function activate(n: ReactNode) {
      return (): void => {
        act(() => {
          result.current[1].activate(n as ReactElement)
        })
      }
    }

    expect(activate(null)).toThrowError()
    expect(activate(undefined)).toThrowError()
  })
})
