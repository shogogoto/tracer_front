import SearchBar from "./SearchBar"
import handlers from "../../api/__mock__"

import type { Meta, StoryObj } from "@storybook/react"

import { wrapper } from "@/features/test"


const meta = {
  title: "concepts/read/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    name: "name",
  },
  decorators: [(Story) => wrapper({ children: <Story /> })],
  parameters: {
    msw: { handlers },
  },
}
