import MutationResult from "./MutationResult"

import type { Meta, StoryObj } from "@storybook/react"


const meta = {
  title: "concepts/save/MutationResult",
  component: MutationResult,
  tags: ["autodocs"],
} satisfies Meta<typeof MutationResult>

export default meta
type Story = StoryObj<typeof meta>

export const Pending: Story = {
  args: {
    isPending: true,
  },
}

export const Error: Story = {
  args: {
    isPending: false,
    errorMessage: "Internal Server Error",
  },
}

export const OK: Story = {
  args: {
    isPending: false,
    successMessage: "作成しました",
  },
}
