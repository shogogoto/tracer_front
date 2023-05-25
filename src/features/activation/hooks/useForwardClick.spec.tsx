import React from "react"
import { render, renderHook } from "@testing-library/react"
import { forwardRef } from "react"
import type { MouseEventHandler } from "react"
import { act } from "react-dom/test-utils"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

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

    render(result.current[0].elements[0])

    expect(clicked).toBe(false)
    act(() => {
      result.current[1].forwardClick(0)
    })
    expect(clicked).toBe(true)
  })
})

type TestProps = {
  handleClick: MouseEventHandler
  text?: string
}

const TestElement = forwardRef<HTMLDivElement, TestProps>((props, ref) => {
  return (
    <div
      onClick={props.handleClick}
      ref={ref}
    >
      {props.text || "test"}
    </div>
  )
})
TestElement.displayName = "TestElement"
