import { useActivation } from "../hooks"

import type { Activatable } from "../types"
import type { Meta, StoryObj } from "@storybook/react"
import type { FC } from "react"

type Props = {
  children: Activatable
  initStyled?: boolean
}

const Activation: FC<Props> = (props) => {
  const [s] = useActivation(props)
  return s.activationElement
}

const meta = {
  title: "Activation",
  component: Activation,
  tags: ["autodocs"],
} satisfies Meta<typeof Activation>

export default meta
type Story = StoryObj<typeof meta>

export const Activated: Story = {
  args: {
    children: <div>Activated</div>,
    initStyled: true,
  },
}

export const Deactivated: Story = {
  args: {
    children: <div>Deactivated</div>,
  },
}
