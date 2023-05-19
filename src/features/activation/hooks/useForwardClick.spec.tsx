import { render, renderHook } from "@testing-library/react"
import { forwardRef } from "react"
import type { MouseEventHandler } from "react"
import { act } from "react-dom/test-utils"

import { useForwardClick } from "."

describe("useForwardClick", () => {
  test("forward click", async () => {
    let clicked = false
    const handleClick: MouseEventHandler = (e) => {
      clicked = true
    }

    const { result } = renderHook(() =>
      useForwardClick(<TestElement handleClick={handleClick} />)
    )

    render(result.current[0].forwardElements[0])

    expect(clicked).toBe(false)
    act(() => {
      result.current[1].forwardClick(0)
    })
    expect(clicked).toBe(true)
  })

  test("clicked index", async () => {
    const elms = [...Array(3)].map((_, i) => {
      const handleClick: MouseEventHandler = (e) => {
        console.log(`clicked ${i}`)
      }
      return <TestElement handleClick={handleClick} />
    })

    const { result } = renderHook(() => useForwardClick(elms))
  })
})

type TestProps = {
  handleClick: MouseEventHandler
}

const TestElement = forwardRef<HTMLDivElement, TestProps>((props, ref) => {
  return (
    <div
      onClick={props.handleClick}
      ref={ref}
    >
      test
    </div>
  )
})
TestElement.displayName = "TestElement"
