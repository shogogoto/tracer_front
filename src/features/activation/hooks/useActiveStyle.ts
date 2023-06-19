import { useCallback } from "react"

import useForwardClick from "./useForwardClick"
import useRotateChildren from "./useRotateChildren"
import useStyle from "./useStyle"
import { clickedChildIndex, IndexFolder } from "../utils"

import type { Activatable, Activatables, Index } from "../types"
import type { Rotator } from "../utils"
import type { SerializedStyles } from "@emotion/react"
import type { MouseEventHandler } from "react"



type State = {
  elements: Activatable[]
  index: Index
  rotator: Rotator
  isStyled: boolean[]
}

type Func = {
  handleClick: MouseEventHandler
  fireClick: VoidFunction
  toggleStyle: (i: Index) => void
  createIndexFolder: (foldSize: number) => IndexFolder
}

type ReturnType = [State, Func]

type Props = {
  children: Activatables
  style: SerializedStyles
}

const useActiveStyle = (props: Props): ReturnType => {
  const [fSt, fFn] = useForwardClick(props.children)
  const [sSt, sFn] = useStyle({
    elms: fSt.elements,
    initStyled: false,
    css: props.style,
  })
  const [rSt, rFn] = useRotateChildren(sSt.elements, null)

  const toggle = useCallback(
    (next: Index) => {
      rFn.setIndex((prev) => {
        sFn.toggleStyle(prev)
        sFn.toggleStyle(next)
        return next
      })
      fFn.scrollIntoView(next)
    },
    [sFn, rFn, fFn]
  )

  const handleClick: MouseEventHandler = useCallback(
    (ev) => {
      const next = clickedChildIndex(ev)
      toggle(next)
    },
    [toggle]
  )

  const fireClick = useCallback(() => {
    fFn.scrollIntoView(rSt.index)
    fFn.click(rSt.index)
  }, [fFn, rSt])

  const createIndexFolder = useCallback(
    (folderSize: number) => new IndexFolder(rSt.count, folderSize),
    [rSt]
  )

  return [
    {
      elements: sSt.elements,
      index: rSt.index,
      rotator: rSt.rotator,
      isStyled: sSt.isStyled,
    },
    {
      handleClick,
      fireClick,
      toggleStyle: toggle,
      createIndexFolder,
    },
  ]
}

export default useActiveStyle
