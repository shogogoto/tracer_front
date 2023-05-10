import { render, screen } from "@testing-library/react"
import { userEvent } from "@storybook/testing-library"
import { act } from "react-dom/test-utils"

import CyclicSwitch from "./CyclicSwitch"

describe("CyclicSwitch", () => {
  const children = (
    <>
      <div>One</div>
      <div>Two</div>
    </>
  )

  test("Clickすると切り替わる", () => {
    render(<CyclicSwitch>{children}</CyclicSwitch>)
    const one = screen.getByText("One")
    act(() => {
      userEvent.click(one)
    })
    expect(one).not.toBeInTheDocument()

    const two = screen.getByText("Two")
    act(() => {
      userEvent.click(two)
    })
    expect(two).not.toBeInTheDocument()

    expect(screen.getByText("One")).toBeInTheDocument()
  })
})
