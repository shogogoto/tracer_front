import { Children, type ReactElement, type ReactNode } from "react"

import * as ReactIs from "react-is"

import type { CyclicSwitchProps } from "../types"

export function countChildren(n: ReactNode): number {
  if (ReactIs.typeOf(n) === undefined) {
    return Children.count(n)
  }

  const c = (n as ReactElement).props.children
  return (ReactIs.isFragment(c) as boolean)
    ? Children.count(c.props.children)
    : Children.count(c)
}

const useCyclicSwitch = (props: CyclicSwitchProps): void => {}

export default useCyclicSwitch
