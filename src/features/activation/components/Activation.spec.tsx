import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { forwardRef, type MouseEventHandler } from "react"

import Activation from "./Activation"

describe("Activation", () => {
  test("enable style", async () => {
    const handleClick: MouseEventHandler = (e) => {
      e.stopPropagation()
    }
    const tgt = (
      <Activation>
        <TestElement handleClick={handleClick} />
      </Activation>
    )

    const user = userEvent.setup()
    const x = render(tgt)
    const t = x.getByText("test")
    expect(t.parentElement).toHaveClass("css-0") // emotion
    await user.click(
      (t.parentElement as HTMLElement).parentElement as HTMLElement
    )
    expect(t.parentElement).not.toHaveClass("css-0") // emotion
  })

  // 子をclick
  test("fire click event of children", async () => {
    let clicked = false
    const handleClick: MouseEventHandler = (e) => {
      e.stopPropagation()
      clicked = !clicked
    }
    const tgt = (
      <Activation>
        <TestElement handleClick={handleClick} />
      </Activation>
    )

    const user = userEvent.setup()
    const x = render(tgt)
    const t = x.getByText("test")
    expect(clicked).toBe(false)
    await user.click(
      (t.parentElement as HTMLElement).parentElement as HTMLElement
    )
    expect(clicked).toBe(true)
  })
})

type TestProps = {
  handleClick?: MouseEventHandler
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
