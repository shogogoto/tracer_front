import ConceptView from "./ConceptView"
import { one, stats } from "../utils"

import type { Meta, StoryObj } from "@storybook/react"



const meta = {
  title: "concepts/View",
  component: ConceptView,
  tags: ["autodocs"],
} satisfies Meta<typeof ConceptView>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    item: {
      item: one(
        "story_1",
        "ここに説明文が来る。Twitterみたいに文字数を少なめに制限したい。"
      ),
      statistics: stats(),
    },
  },
}
