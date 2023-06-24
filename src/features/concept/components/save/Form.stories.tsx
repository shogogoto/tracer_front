import Form from "./Form"
import handlers from "../../api/__mock__"

import type { Meta, StoryObj } from "@storybook/react"

import { wrapper } from "@/features/test"


const meta = {
  title: "concepts/save/Form",
  component: Form,
  tags: ["autodocs"],
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {},
  decorators: [(Story) => wrapper({ children: <Story /> })],
  parameters: {
    msw: { handlers },
  },
}
