import { TipDistance } from "./TipDistance"

import type { Meta, StoryObj } from "@storybook/react"


const meta = {
  title: "concepts/read/TipDistance",
  component: TipDistance,
  tags: ["autodocs"],
} satisfies Meta<typeof TipDistance>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    fromLeaf: 1,
    fromRoot: 3,
    enableTooltipAtSolo: true,
  },
}
