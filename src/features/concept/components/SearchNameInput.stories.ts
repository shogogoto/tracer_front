import SearchNameInput from "./SearchNameInput"

import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "concepts/SearchNameInput",
  component: SearchNameInput,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchNameInput>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    name: "name",
  },
}
