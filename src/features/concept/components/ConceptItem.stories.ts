import ConceptItem from "./ConceptItem"
import { one } from "../utils"

import type { Meta, StoryObj } from "@storybook/react"


const meta = {
  title: "concepts/Item",
  component: ConceptItem,
  tags: ["autodocs"],
} satisfies Meta<typeof ConceptItem>

export default meta
type Story = StoryObj<typeof meta>

const c = one("X".repeat(16), "xxxx ".repeat(30))

export const Line: Story = {
  args: {
    isLineStyle: true,
    concept: c,
  },
}

export const Card: Story = {
  args: {
    isLineStyle: false,
    concept: c,
  },
}
