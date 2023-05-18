import { render, renderHook } from "@testing-library/react"
import { forwardRef } from "react"
import { act } from "react-dom/test-utils"

import { useForwardClick } from "."

describe("useForwardClick", () => {
  test("forward click", async () => {
    let clicked = false
    const handleClick = (): void => {
      clicked = true
    }

    let flag = false
    const preaction = (): void => {
      flag = true
    }

    const { result } = renderHook(() =>
      useForwardClick(<TestElement handleClick={handleClick} />, preaction)
    )

    render(result.current[0].forwardElement)

    expect(clicked).toBe(false)
    expect(flag).toBe(false)
    act(() => {
      result.current[1].forwardClick()
    })
    expect(clicked).toBe(true)
    expect(flag).toBe(true)
  })
})

type TestProps = {
  handleClick: VoidFunction
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
