import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { forwardRef } from "react"

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
    const ac = x.getByText("test")
    expect(ac?.parentElement).toHaveClass("css-0") // emotion
    await user.click(ac)
    expect(ac.parentElement).not.toHaveClass("css-0") // emotion
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
    const ac = x.getByText("test")
    expect(clicked).toBe(false)
    await user.click(ac)
    expect(clicked).toBe(true)
  })
})

type TestProps = {
  handleClick?: VoidFunction
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
