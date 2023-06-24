import { TreeCount } from "./TreeCount"

import type { Meta, StoryObj } from "@storybook/react"


const meta = {
  title: "concepts/read/TreeCount",
  component: TreeCount,
  tags: ["autodocs"],
} satisfies Meta<typeof TreeCount>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    neighborUpperCount: 1,
    neighborLowerCount: 1,
    allUpperCount: 1,
    allLowerCount: 1,
    enableTooltipAtSolo: true,
  },
}
