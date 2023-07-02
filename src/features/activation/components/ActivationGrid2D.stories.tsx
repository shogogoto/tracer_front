import { css } from "@emotion/react"
import { forwardRef } from "react"

import ActivationGrid2D from "./ActivationGrid2D"

import type { Activatables } from "../types"
import type { Meta, StoryObj } from "@storybook/react"



const meta = {
  title: "activation/ActivationGrid2D",
  component: ActivationGrid2D,
  tags: ["autodocs"],
} satisfies Meta<typeof ActivationGrid2D>

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

export const Divisible: Story = {
  args: {
    children: createChildren(50),
    foldSize: 5,
  },
}
