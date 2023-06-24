import SearchResult from "./SearchResult"
import { mockedConceptsList } from "../../api/__mock__/get"

import type { Meta, StoryObj } from "@storybook/react"


const meta = {
  title: "concepts/read/SearchResult",
  component: SearchResult,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchResult>

export default meta
type Story = StoryObj<typeof meta>

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}

export const Error: Story = {
  args: {
    isLoading: false,
    errorMessage: "Request failed with status code 500",
  },
}

export const OK: Story = {
  args: {
    isLoading: false,
    data: mockedConceptsList(10),
  },
}
