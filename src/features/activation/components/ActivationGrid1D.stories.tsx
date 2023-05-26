import { forwardRef } from "react"

import ActivationGrid1D from "./ActivationGrid1D"

import type { Activatables } from "../types"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "ActivationGrid1D",
  component: ActivationGrid1D,
  tags: ["autodocs"],
} satisfies Meta<typeof ActivationGrid1D>

export default meta
type Story = StoryObj<typeof meta>

type TestProps = {
  text: string
}

const TestElement = forwardRef<HTMLDivElement, TestProps>((props, ref) => {
  const handleClick = (): void => {
    console.log(props.text)
  }

  return (
    <div
      onClick={handleClick}
      ref={ref}
    >
      {props.text}
    </div>
  )
})
TestElement.displayName = "TestElement"

function createChildren(num: number): Activatables {
  return [...Array(num)].map((_, i) => (
    <TestElement
      key={i}
      text={`${i}`}
    />
  ))
}

export const Component0: Story = {
  args: {
    children: createChildren(0),
  },
}

export const Component1: Story = {
  args: {
    children: createChildren(1),
  },
}

export const Components2: Story = {
  args: {
    children: createChildren(2),
  },
}

export const Components50: Story = {
  args: {
    children: createChildren(50),
  },
}
