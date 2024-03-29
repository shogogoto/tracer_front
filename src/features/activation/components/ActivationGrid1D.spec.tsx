import React, { MouseEventHandler } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { forwardRef, ReactElement } from "react"
import type { ReactNode } from "react"
import { useKey } from "react-use"
import { act } from "react-dom/test-utils"

import ActivationGrid1D from "./ActivationGrid1D"

type TestProps = {
  handleClick?: MouseEventHandler
  text?: string
}

const TestElement = forwardRef<HTMLDivElement, TestProps>((props, ref) => {
  return (
    <div
      onClick={props.handleClick}
      ref={ref}
    >
      {props.text ?? "default"}
    </div>
  )
})
TestElement.displayName = "TestElement"

const e = [...Array(3)].map((_, i) => (
  <TestElement
    key={i}
    text={`${i}`}
  />
))

const target = <ActivationGrid1D styleType="horizon">{e}</ActivationGrid1D>

describe("ActivationGrid1D", () => {
  function assertStyle(i: number): void {
    ;[...Array(3)].forEach((_, j) => {
      const exp = expect(screen.getByText(`${j}`).parentElement)
      if (j === i) {
        exp.not.toHaveClass("css-0") // styleが有効
      } else {
        exp.toHaveClass("css-0") // styleが無効
      }
    })
  }

  test("move style", async () => {
    const user = userEvent.setup()
    const x = render(target)
    const tgt = () => x.getByTestId("activation-grid-1d")

    assertStyle(99) // no style
    await user.click(tgt())
    await user.keyboard("{ArrowRight}")
    assertStyle(0)
    await user.keyboard("{ArrowRight}")
    assertStyle(1)
    await user.keyboard("{ArrowRight}")
    assertStyle(2)
    await user.keyboard("{ArrowRight}")
    assertStyle(0)
    act(() => {
      tgt().blur()
    })
    assertStyle(99) // no style
    await user.click(tgt())

    await user.keyboard("{ArrowLeft}")
    assertStyle(2)
    await user.keyboard("{ArrowLeft}")
    assertStyle(1)
    await user.keyboard("{ArrowLeft}")
    assertStyle(0)
    await user.keyboard("{ArrowLeft}")
    assertStyle(2)
    act(() => {
      tgt().blur()
    })
    assertStyle(99) // no style
    await user.click(tgt())

    await user.click(x.getByText("1"))
    assertStyle(1)
    await user.keyboard("{ArrowRight}")
    assertStyle(2)
    await user.click(x.getByText("0"))
    assertStyle(0)
    await user.keyboard("{ArrowLeft}")
    assertStyle(2)

    await user.keyboard("{Control>}{ArrowLeft}{/Control}")
    assertStyle(0)

    await user.keyboard("{Control>}{ArrowRight}{/Control}")
    assertStyle(2)
  })

  test("fire click event", async () => {
    let current: number | null = null

    const e = [...Array(3)].map((_, i) => {
      const handleClick = () => {
        current = i
      }

      return (
        <TestElement
          key={i}
          text={`${i}`}
          handleClick={handleClick}
        />
      )
    })
    const target = <ActivationGrid1D styleType="vertical">{e}</ActivationGrid1D>

    const user = userEvent.setup()
    const x = render(target)
    const tgt = () => x.getByTestId("activation-grid-1d")
    await user.click(tgt())

    await user.keyboard("{ArrowDown}")
    assertStyle(0)
    expect(current).toBeNull()
    await user.keyboard("{enter}")
    expect(current).toBe(0)

    await user.keyboard("{ArrowDown}")
    await user.keyboard("{enter}")
    expect(current).toBe(1)

    await user.keyboard("{ArrowUp}")
    await user.keyboard("{enter}")
    expect(current).toBe(0)
  })
})
