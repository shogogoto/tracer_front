import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { ReactElement, ReactNode } from "react"
import { forwardRef } from "react"
import { useKey } from "react-use"

import Activation from "./Activation"

describe("Activation", () => {
  test("enable style", async () => {
    let flag = false
    const isActivated = (n: ReactElement): boolean => flag
    const activate = (n: ReactNode): void => {
      flag = true
    }

    const tgt = (
      <Activation
        isActivated={isActivated}
        activate={activate}
      >
        <TestElement />
      </Activation>
    )

    const user = userEvent.setup()
    const x = render(tgt)
    const ac = x.getByTestId("activation")
    expect(ac).toHaveClass("css-0") // emotion
    await user.click(ac)
    expect(ac).not.toHaveClass("css-0") // emotion
  })

  // 子をckick
  test("fire click event of children", async () => {
    let clicked = false
    const handleClick = (): void => {
      clicked = true
    }
    const tgt = (
      <Activation
        isActivated={(n) => true}
        activate={() => {}}
      >
        <TestElement handleClick={handleClick} />
      </Activation>
    )

    const user = userEvent.setup()
    const x = render(tgt)
    const ac = x.getByTestId("activation")
    expect(clicked).toBe(false)
    await user.click(ac)
    expect(clicked).toBe(true)
  })

  // 子をEnter
  test("fire press Enter event of children", async () => {
    let entered = false
    const handleEnter = (): void => {
      entered = true
    }
    const tgt = (
      <Activation
        isActivated={(n) => true}
        activate={() => {}}
      >
        <TestElement handleEnter={handleEnter} />
      </Activation>
    )

    const user = userEvent.setup()
    const x = render(tgt)
    const ac = x.getByTestId("activation")
    ac.focus()
    expect(entered).toBe(false)
    await user.keyboard("{enter}")
    expect(entered).toBe(true)
  })
})

type TestProps = {
  handleClick?: VoidFunction
  handleEnter?: VoidFunction
}

const TestElement = forwardRef<HTMLDivElement, TestProps>((props, ref) => {
  useKey("Enter", props.handleEnter)
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
