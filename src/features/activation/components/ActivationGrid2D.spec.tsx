import React, { MouseEventHandler } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { forwardRef, ReactElement } from "react"
import type { ReactNode } from "react"
import { useKey } from "react-use"
import { act } from "react-dom/test-utils"

import ActivationGrid2D from "./ActivationGrid2D"
import ActivationGrid1D from "./ActivationGrid1D"
import { reshapeJagged2D } from "../utils/reshape"
import type { Activatable } from "../types"

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

function setup(length: number, size: number, handlers?: VoidFunction[]) {
  const e = [...Array(length)].map((_, i) => {
    const handler = handlers ? handlers[i] : () => null
    return (
      <TestElement
        key={i}
        text={`${i}`}
        handleClick={handler}
      />
    )
  })

  const target = <ActivationGrid2D foldSize={size}>{e}</ActivationGrid2D>

  function assertStyle(i: number): void {
    e.forEach((_, j) => {
      const exp = expect(screen.getByText(`${j}`).parentElement)
      if (j === i) {
        exp.not.toHaveClass("css-0") // styleが有効
      } else {
        exp.toHaveClass("css-0") // styleが無効
      }
    })
  }

  return {
    target,
    assertStyle,
  }
}

describe("ActivationGrid2D", () => {
  test("move style", async () => {
    const { target, assertStyle } = setup(5, 3)
    const user = userEvent.setup()
    const r = render(target)
    const tgt = () => r.getByTestId("activation-grid-2d")
    assertStyle(99) // no style

    // before focus
    await user.keyboard("{ArrowRight}")
    assertStyle(99) // no style
    await user.click(tgt())

    // 1行目左右
    await user.click(r.getByText("0"))
    assertStyle(0)
    await user.keyboard("{ArrowRight}")
    assertStyle(1)
    await user.keyboard("{ArrowRight}")
    assertStyle(2)
    await user.keyboard("{ArrowRight}")
    assertStyle(0)
    await user.keyboard("{ArrowLeft}")
    assertStyle(2)
    await user.keyboard("{ArrowLeft}")
    assertStyle(1)
    await user.keyboard("{ArrowLeft}")
    assertStyle(0)

    // 2行目左右
    await user.click(r.getByText("3"))
    assertStyle(3)
    await user.keyboard("{ArrowRight}")
    assertStyle(4)
    await user.keyboard("{ArrowRight}")
    assertStyle(3)
    await user.keyboard("{ArrowLeft}")
    assertStyle(4)
    await user.keyboard("{ArrowLeft}")
    assertStyle(3)

    // 1列目上下
    await user.keyboard("{ArrowDown}")
    assertStyle(0)
    await user.keyboard("{ArrowDown}")
    assertStyle(3)
    await user.keyboard("{ArrowUp}")
    assertStyle(0)
    await user.keyboard("{ArrowUp}")
    assertStyle(3)

    // 2列目上下
    await user.click(r.getByText("1"))
    assertStyle(1)
    await user.keyboard("{ArrowDown}")
    assertStyle(4)
    await user.keyboard("{ArrowDown}")
    assertStyle(1)
    await user.keyboard("{ArrowUp}")
    assertStyle(4)
    await user.keyboard("{ArrowUp}")
    assertStyle(1)

    // 3列目上下
    await user.click(r.getByText("2"))
    assertStyle(2)
    await user.keyboard("{ArrowDown}")
    assertStyle(2)
    await user.keyboard("{ArrowUp}")
    assertStyle(2)

    act(() => {
      tgt().blur()
    })
    assertStyle(99) // no style
  })

  test("fire click event", async () => {
    let current: number | null = null
    const handlers = [...Array(3)].map((_, i) => {
      return () => {
        current = i
      }
    })
    const { target } = setup(3, 2, handlers)
    const user = userEvent.setup()
    const r = render(target)
    const tgt = () => r.getByTestId("activation-grid-2d")

    await user.keyboard("{Enter}")
    expect(current).toBeNull()

    await user.click(tgt())
    expect(current).toBeNull()

    await user.click(r.getByText("0"))
    expect(current).toBe(0)

    await user.keyboard("{ArrowRight}")
    await user.keyboard("{Enter}")
    expect(current).toBe(1)
  })

  test("to edges", async () => {
    const { target, assertStyle } = setup(9, 3)
    const user = userEvent.setup()
    const r = render(target)
    const tgt = () => r.getByTestId("activation-grid-2d")

    // 0 1 2
    // 3 4 5
    // 6 7 8
    await user.click(r.getByText("4")) // set at center
    await user.keyboard("{Control>}{ArrowLeft}{/Control}")
    assertStyle(3)
    await user.keyboard("{Control>}{ArrowRight}{/Control}")
    assertStyle(5)
    await user.keyboard("{Control>}{ArrowUp}{/Control}")
    assertStyle(2)
    await user.keyboard("{Control>}{ArrowDown}{/Control}")
    assertStyle(8)
  })
})
