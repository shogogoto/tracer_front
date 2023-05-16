import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { forwardRef } from "react"
import { useKey } from "react-use"

import Activation from "./Activation"

describe("Activation", () => {
  test("enable style", async () => {
    const tgt = (
      <Activation>
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

  // 子をclick
  test("fire click event of children", async () => {
    let clicked = false
    const handleClick = (): void => {
      clicked = true
    }
    const tgt = (
      <Activation>
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
      <Activation>
        <TestElement handleEnter={handleEnter} />
      </Activation>
    )

    const user = userEvent.setup()
    const x = render(tgt)
    const ac = x.getByTestId("activation")
    expect(entered).toBe(false)
    ac.focus()
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
