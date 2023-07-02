import SearchNameInput from "./SearchNameInput"

import type { Meta, StoryObj } from "@storybook/react"


const meta = {
  title: "concepts/read/SearchNameInput",
  component: SearchNameInput,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchNameInput>

export default meta
type Story = StoryObj<typeof meta>

export const WithoutButton: Story = {
  args: {
    name: "name",
  },
}

export const WithButton: Story = {
  args: {
    name: "name",
    submitButton: true,
  },
}
