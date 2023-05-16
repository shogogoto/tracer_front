import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import CyclicSwitch from "./CyclicSwitch"

describe("CyclicSwitch", () => {
  const children = (
    <>
      <div>One</div>
      <div>Two</div>
    </>
  )

  test("Clickすると切り替わる", async () => {
    const user = userEvent.setup()
    render(<CyclicSwitch>{children}</CyclicSwitch>)

    const one = screen.getByText("One")
    await user.click(one)
    expect(one).not.toBeInTheDocument()

    const two = screen.getByText("Two")
    await user.click(two)
    expect(two).not.toBeInTheDocument()

    expect(screen.getByText("One")).toBeInTheDocument()
  })

  test("Enterキー入力でも切り替わる", async () => {
    const user = userEvent.setup()
    render(
      <CyclicSwitch>
        <div>One</div>
        <div>Two</div>
      </CyclicSwitch>
    )
    const sw = screen.getByTestId("cycle-switch")
    sw.focus()

    expect(screen.getByText("One")).toBeInTheDocument()
    await user.keyboard("{enter}")
    expect(screen.getByText("Two")).toBeInTheDocument()

    // Enter以外では切り替わらない
    await user.keyboard("{a}")
    expect(screen.getByText("Two")).toBeInTheDocument()

    await user.keyboard("{enter}")
    expect(screen.getByText("One")).toBeInTheDocument()
  })
})
