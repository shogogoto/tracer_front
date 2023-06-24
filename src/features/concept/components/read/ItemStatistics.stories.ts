import ItemStatistics from "./ItemStatistics"

import type { Meta, StoryObj } from "@storybook/react"


const meta = {
  title: "concepts/read/ItemStatistics",
  component: ItemStatistics,
  tags: ["autodocs"],
} satisfies Meta<typeof ItemStatistics>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    all_lower_count: 1,
    all_upper_count: 1,
    lower_neighbor_count: 1,
    upper_neighbor_count: 1,
    max_distance_from_roots: 1,
    max_distance_from_leaves: 1,
    enableTooltipAtSolo: true,
  },
}
