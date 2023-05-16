import type { Meta, StoryObj } from "@storybook/react"

import Activation from "./Activation"

const meta = {
  title: "Activation",
  component: Activation,
  tags: ["autodocs"],
} satisfies Meta<typeof Activation>

export default meta
type Story = StoryObj<typeof meta>

const e1 = <div>Activated</div>
const e2 = <div>Deactivated</div>

export const Activated: Story = {
  args: {
    children: e1,
    init: e1,
  },
}

export const Deactivated: Story = {
  args: {
    children: e2,
    init: e1,
  },
}
