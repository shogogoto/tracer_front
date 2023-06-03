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

describe("ActivationGrid2D", () => {
  test("move style", async () => {
    const e = [...Array(5)].map((_, i) => {
      return (
        <TestElement
          key={i}
          text={`${i}`}
        />
      )
    })

    const target = <ActivationGrid2D foldSize={3}>{e}</ActivationGrid2D>
    const user = userEvent.setup()
    const r = render(target)
    function assertStyle(i: number): void {
      ;[...Array(5)].forEach((_, j) => {
        const exp = expect(screen.getByText(`${j}`).parentElement)
        if (j === i) {
          exp.not.toHaveClass("css-0") // styleが有効
        } else {
          exp.toHaveClass("css-0") // styleが無効
        }
      })
    }
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
    const target = <ActivationGrid2D foldSize={2}>{e}</ActivationGrid2D>
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
})
