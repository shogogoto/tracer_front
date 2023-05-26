import { css } from "@emotion/react"
import { useMemo, useCallback } from "react"
import { useKey } from "react-use"

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

  const handleClick: MouseEventHandler = useCallback(
    (e) => {
      const next = _clickedIndex(e)
      rFn.setIndex((prev) => {
        sFn.toggleStyle(prev)
        sFn.toggleStyle(next)
        fFn.forwardClick(next)
        return next
      })
    },
    [fFn, rFn, sFn, _clickedIndex]
  )

  const increment = useCallback(() => {
    const next = rFn.incremental(rSt.index)
    rFn.setIndex((prev: Index) => {
      sFn.toggleStyle(prev)
      sFn.toggleStyle(next)
      return next
    })
  }, [rFn, sFn, rSt])

  const decrement = useCallback(() => {
    rFn.decrement()
  }, [rFn])

  useKey("{enter}", increment)
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
    },
  ]
}

export default useActivation
