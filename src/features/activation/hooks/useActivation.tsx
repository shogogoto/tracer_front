import { css } from "@emotion/react"
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
}

type State = {
  wrapped: ReactElement
  isStyled: boolean[]
}

type Func = {
  handleClick: MouseEventHandler
  increment: VoidFunction
  decrement: VoidFunction
  clear: VoidFunction
}

type ReturnType = [State, Func]

const useActivation = (props: Props): ReturnType => {
  const [sSt, sFn] = useStyle({
    elms: props.children,
    initStyled: props.initStyled ?? false,
    css: cssActivated,
  })
  const [, fFn] = useForwardClick(sSt.elements)
  const [rSt, rFn] = useRotateChildren(sSt.elements, null)

  const _clickedIndex = useCallback((ev: MouseEvent): number => {
    const nodes = ev.currentTarget.childNodes
    return Array.from(nodes).findIndex((e) =>
      e.contains(ev.target as ChildNode)
    )
  }, [])

  const _toggleStyle = useCallback(
    (next: Index) => {
      rFn.setIndex((prev) => {
        sFn.toggleStyle(prev)
        sFn.toggleStyle(next)
        typeof next === "number" && fFn.forwardClick(next)
        return next
      })
    },
    [sFn, fFn, rFn]
  )

  const handleClick: MouseEventHandler = useCallback(
    (ev) => {
      const next = _clickedIndex(ev)
      _toggleStyle(next)
    },
    [_clickedIndex, _toggleStyle]
  )

  const increment = useCallback(() => {
    const next = rFn.incremental(rSt.index)
    _toggleStyle(next)
  }, [rFn, rSt, _toggleStyle])

  const decrement = useCallback(() => {
    const next = rFn.decremental(rSt.index)
    _toggleStyle(next)
  }, [rFn, rSt, _toggleStyle])

  const clear = useCallback(() => {
    const next = null
    rFn.setIndex((prev: Index) => {
      sFn.toggleStyle(prev)
      return next
    })
  }, [rFn, sFn])

  const wrapped = useMemo(
    () => <div onClick={handleClick}>{sSt.elements}</div>,
    [handleClick, sSt]
  )

  return [
    {
      wrapped,
      isStyled: sSt.isStyled,
    },
    {
      handleClick,
      increment,
      decrement,
      clear,
    },
  ]
}

export default useActivation
