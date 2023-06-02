import { css, type SerializedStyles } from "@emotion/react"
import { useMemo, useCallback } from "react"

import { useForwardClick, useStyle, useRotateChildren } from "../hooks"

import type { Activatables, Index } from "../types"
import type { MouseEventHandler, ReactElement, MouseEvent } from "react"

export const cssActivated = css`
  color: red;
  border: solid;
`

type Props = {
  children: Activatables
  initStyled?: boolean
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
  increment: VoidFunction
  decrement: VoidFunction
  setFirstIndex: VoidFunction
  setLastIndex: VoidFunction
  clear: VoidFunction
  fireClick: VoidFunction
}

type ReturnType = [State, Func]

const useActivation = (props: Props): ReturnType => {
  const [fSt, fFn] = useForwardClick(props.children)
  const [sSt, sFn] = useStyle({
    elms: fSt.elements,
    initStyled: props.initStyled ?? false,
    css: props.activeStyle ?? cssActivated,
  })
  const [rSt, rFn] = useRotateChildren(sSt.elements, props.index ?? null)

  const _clickedIndex = useCallback((ev: MouseEvent): number => {
    const nodes = ev.currentTarget.childNodes
    return Array.from(nodes).findIndex((e) =>
      e.contains(ev.target as ChildNode)
    )
  }, [])

  const _toggleStyle = useCallback(
    (next: Index) => {
      fFn.scrollIntoView(next)
      rFn.setIndex((prev) => {
        sFn.toggleStyle(prev)
        sFn.toggleStyle(next)
        return next
      })
    },
    [sFn, rFn, fFn]
  )

  const handleClick: MouseEventHandler = useCallback(
    (ev) => {
      const next = _clickedIndex(ev)
      fFn.forwardClick(next)
      _toggleStyle(next)
    },
    [fFn, _clickedIndex, _toggleStyle]
  )

  const increment = useCallback(() => {
    const next = rSt.rotator.increment(rSt.index)
    _toggleStyle(next)
  }, [rSt, _toggleStyle])

  const decrement = useCallback(() => {
    const next = rSt.rotator.decrement(rSt.index)
    _toggleStyle(next)
  }, [rSt, _toggleStyle])

  const setFirstIndex = useCallback(() => {
    _toggleStyle(rSt.rotator.min)
  }, [_toggleStyle, rSt])

  const setLastIndex = useCallback(() => {
    _toggleStyle(rSt.rotator.max)
  }, [_toggleStyle, rSt])

  const clear = useCallback(() => {
    const next = null
    _toggleStyle(next)
  }, [_toggleStyle])

  const fireClick = useCallback(() => {
    fFn.scrollIntoView(rSt.index)
    fFn.forwardClick(rSt.index)
  }, [fFn, rSt])

  const isActive = sSt.isStyled.some((e) => e)

  const wrapped = useMemo(
    () => (
      <div
        onClick={handleClick}
        css={props.style}
      >
        {sSt.elements}
      </div>
    ),
    [handleClick, sSt, props.style]
  )

  return [
    {
      wrapped,
      isStyled: sSt.isStyled,
      isActive,
    },
    {
      handleClick,
      increment,
      decrement,
      setFirstIndex,
      setLastIndex,
      clear,
      fireClick,
    },
  ]
}

export default useActivation
