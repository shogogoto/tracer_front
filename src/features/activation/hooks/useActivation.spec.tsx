import React from "react"
import { render, renderHook } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { forwardRef } from "react"
import type { FC, MouseEventHandler } from "react"
import { act } from "@testing-library/react"

import type { Activatables } from "../types"
import { useActivation } from "../hooks"

type TestProps = {
  handleClick?: MouseEventHandler
  text?: string
}

const TestChild = forwardRef<HTMLDivElement, TestProps>((props, ref) => {
  return (
    <div
      onClick={props.handleClick}
      ref={ref}
    >
      {props.text ?? "default"}
    </div>
  )
})
TestChild.displayName = "TestElement"

type Props = {
  children: Activatables
  initStyled?: boolean
}

const Activation: FC<Props> = (props) => {
  const [s] = useActivation(props)
  return s.wrapped
}

describe("Activation", () => {
  function assertStyle(actual: boolean[], i: number): void {
    const expected = [...Array(3)].map((_, j) => (j === i ? true : false))
    expect(actual).toEqual(expected)
  }

  test("style by click", async () => {
    const e = [...Array(3)].map((_, i) => <TestChild text={`${i}`} />)

    const { result } = renderHook(() => useActivation({ children: e }))
    const r = render(<Activation>{e}</Activation>)
    const user = userEvent.setup()

    function assertClick(i: number): void {
      ;[...Array(3)].forEach((_, j) => {
        const exp = expect(r.getByText(`${j}`).parentElement)
        if (j === i) {
          exp.not.toHaveClass("css-0") // styleが有効
        } else {
          exp.toHaveClass("css-0") // styleが無効
        }
      })
    }

    assertClick(999) // nothing styled
    await user.click(r.getByText("0"))
    assertClick(0)
    await user.click(r.getByText("2"))
    assertClick(2)
    await user.click(r.getByText("1"))
    assertClick(1)
    await user.click(r.getByText("1"))
    assertClick(1)
    await user.click(r.getByText("0"))
    assertClick(0)
    await user.click(r.getByText("1"))
    assertClick(1)
    act(() => result.current[1].clear())
    assertStyle(result.current[0].isStyled, 999) // nothing styled
    await user.click(r.getByText("2"))
    assertClick(2)
  })

  test("style by increment", async () => {
    const e = [...Array(3)].map((_, i) => <TestChild text={`${i}`} />)
    const { result } = renderHook(() => useActivation({ children: e }))
    const inc = () => {
      act(() => {
        result.current[1].increment()
      })
    }

    assertStyle(result.current[0].isStyled, 999) // nothing styled
    inc()
    assertStyle(result.current[0].isStyled, 0)
    inc()
    assertStyle(result.current[0].isStyled, 1)
    inc()
    assertStyle(result.current[0].isStyled, 2)
    inc()
    assertStyle(result.current[0].isStyled, 0)
    act(() => result.current[1].clear())
    assertStyle(result.current[0].isStyled, 999) // nothing styled
    inc()
    assertStyle(result.current[0].isStyled, 0)
  })

  test("style by decrement", async () => {
    const e = [...Array(3)].map((_, i) => <TestChild text={`${i}`} />)
    const { result } = renderHook(() => useActivation({ children: e }))
    const dec = () => {
      act(() => {
        result.current[1].decrement()
      })
    }

    assertStyle(result.current[0].isStyled, 999) // nothing styled
    dec()
    assertStyle(result.current[0].isStyled, 2)
    dec()
    assertStyle(result.current[0].isStyled, 1)
    dec()
    assertStyle(result.current[0].isStyled, 0)
    dec()
    assertStyle(result.current[0].isStyled, 2)
    act(() => result.current[1].clear())
    assertStyle(result.current[0].isStyled, 999) // nothing styled
    dec()
    assertStyle(result.current[0].isStyled, 2)
  })
})
