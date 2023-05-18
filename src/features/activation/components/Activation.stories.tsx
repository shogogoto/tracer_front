import type { Meta, StoryObj } from "@storybook/react"

import Activation from "./Activation"

const meta = {
  title: "Activation",
  component: Activation,
  tags: ["autodocs"],
} satisfies Meta<typeof Activation>

export default meta
type Story = StoryObj<typeof meta>

export const Activated: Story = {
  args: {
    children: <div>Activated</div>,
    initStyled: true,
  },
}

export const Deactivated: Story = {
  args: {
    children: <div>Deactivated</div>,
  },
}
