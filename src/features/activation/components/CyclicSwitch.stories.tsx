import type { Meta, StoryObj } from "@storybook/react"

import CyclicSwitch from "./CyclicSwitch"

const meta = {
  title: "CyclicSwitch",
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
