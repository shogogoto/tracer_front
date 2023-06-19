import { css, type SerializedStyles } from "@emotion/react"
import { useMemo, useCallback } from "react"

import useActiveStyle from "./useActiveStyle"

import type { Activatables, Index } from "../types"
import type { MouseEventHandler, ReactElement } from "react"


export const cssActivated = css`
  color: red;
  border: solid;
`

type Props = {
  children: Activatables
  activeStyle?: SerializedStyles
  style?: SerializedStyles
  index?: Index
}

type State = {
  wrapped: ReactElement
  isStyled: boolean[]
  isActive: boolean
}

type Func = {
  handleClick: MouseEventHandler
  fireClick: VoidFunction
  increment: VoidFunction
  decrement: VoidFunction
  setFirstIndex: VoidFunction
  setLastIndex: VoidFunction
  clear: VoidFunction
}

type ReturnType = [State, Func]

const useActivation1D = (props: Props): ReturnType => {
  const [st, fn] = useActiveStyle({
    children: props.children,
    style: cssActivated,
  })

  const increment = useCallback(() => {
    const next = st.rotator.increment(st.index)
    fn.toggleStyle(next)
  }, [st, fn])

  const decrement = useCallback(() => {
    const next = st.rotator.decrement(st.index)
    fn.toggleStyle(next)
  }, [st, fn])

  const setFirstIndex = useCallback(() => {
    fn.toggleStyle(st.rotator.min)
  }, [fn, st])

  const setLastIndex = useCallback(() => {
    fn.toggleStyle(st.rotator.max)
  }, [fn, st])

  const clear = useCallback(() => {
    fn.toggleStyle(null)
  }, [fn])

  const isActive = st.isStyled.some((e) => e)

  const wrapped = useMemo(
    () => (
      <div
        onClick={fn.handleClick}
        css={props.style}
      >
        {st.elements}
      </div>
    ),
    [fn, st, props.style]
  )

  return [
    {
      wrapped,
      isStyled: st.isStyled,
      isActive,
    },
    {
      ...fn,
      increment,
      decrement,
      setFirstIndex,
      setLastIndex,
      clear,
    },
  ]
}

export default useActivation1D
