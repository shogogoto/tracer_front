import { css } from "@emotion/react"
import { forwardRef } from "react"

import ActivationGrid1D from "./ActivationGrid1D"

import type { Activatables } from "../types"
import type { Meta, StoryObj } from "@storybook/react"



const meta = {
  title: "activation/ActivationGrid1D",
  component: ActivationGrid1D,
  tags: ["autodocs"],
} satisfies Meta<typeof ActivationGrid1D>

export default meta
type Story = StoryObj<typeof meta>

type TestProps = {
  text: string
}

const testStyle = css`
  width: 60px;
`

const TestElement = forwardRef<HTMLDivElement, TestProps>((props, ref) => {
  const handleClick = (): void => {
    console.log(props.text)
  }

  return (
    <div
      onClick={handleClick}
      ref={ref}
      css={testStyle}
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

export const Horizon: Story = {
  args: {
    children: createChildren(50),
    styleType: "horizon",
  },
}

export const Vertical: Story = {
  args: {
    children: createChildren(50),
    styleType: "vertical",
  },
}
