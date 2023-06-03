import { renderHook } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import flattenChildren from "react-flatten-children"
import type { ReactNode, ReactElement } from "react"

import { useCurrentNode } from "../hooks"

const e = (
  <>
    <p>0</p>
    <p>1</p>
    <p>2</p>
  </>
)

describe("useCurrentNode", () => {
  test("set/unset element", () => {
    const children = flattenChildren(e)
    const { result } = renderHook(() => useCurrentNode(null))
    expect(result.current[0]).toBeNull()

    function check(i: number): void {
      expect(result.current[1].isCurrent(children[i])).toBe(false)
      act(() => {
        result.current[1].set(children[i] as ReactElement)
      })
      expect(result.current[1].isCurrent(children[i])).toBe(true)
    }

    check(0)
    check(1)
    check(2)

    act(() => {
      result.current[1].unset()
    })
    expect(result.current[0]).toBeNull()
  })

  test("set not element", () => {
    const { result } = renderHook(() => useCurrentNode(e))
    function activate(n: ReactNode) {
      return (): void => {
        act(() => {
          result.current[1].set(n as ReactElement)
        })
      }
    }

    expect(activate(null)).toThrowError()
    expect(activate(undefined)).toThrowError()
  })
})
