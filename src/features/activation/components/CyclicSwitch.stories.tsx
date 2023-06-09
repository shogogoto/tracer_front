import CyclicSwitch from "./CyclicSwitch"

import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "activation/CyclicSwitch",
  component: CyclicSwitch,
} satisfies Meta<typeof CyclicSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: (
      <>
        <div>One</div>
        <div>Two</div>
        <div>
          <p>Three</p>
          <p>description</p>
        </div>
      </>
    ),
  },
}
