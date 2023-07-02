import { type SerializedStyles } from "@emotion/react"
import { useMemo, useCallback } from "react"

import { cssActivated } from "./useActivation1D"
import useActiveStyle from "./useActiveStyle"
import { horizonStyle } from "../components/ActivationGrid1D"
import { clickedChildIndex, reshapeJagged2D } from "../utils"

import type { Activatables, Index } from "../types"
import type { MouseEventHandler, ReactElement } from "react"



type Props = {
  children: Activatables
  foldSize: number
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
  incHorizontal: VoidFunction
  decHorizontal: VoidFunction
  incVertical: VoidFunction
  decVertical: VoidFunction
  setFirstHorizontal: VoidFunction
  setLastHorizontal: VoidFunction
  setFirstVertical: VoidFunction
  setLastVertical: VoidFunction
  clear: VoidFunction
}

type ReturnType = [State, Func]

const useActivation2D = (props: Props): ReturnType => {
  const [st, fn] = useActiveStyle({
    children: props.children,
    style: cssActivated,
  })
  const folder = fn.createIndexFolder(props.foldSize)

  const incHorizontal = useCallback(() => {
    const next = folder.incrementHorizontal(st.index)
    fn.toggleStyle(next)
  }, [folder, st, fn])

  const decHorizontal = useCallback(() => {
    const next = folder.decrementHorizontal(st.index)
    fn.toggleStyle(next)
  }, [folder, st, fn])

  const incVertical = useCallback(() => {
    const next = folder.incrementVertical(st.index)
    fn.toggleStyle(next)
  }, [folder, st, fn])

  const decVertical = useCallback(() => {
    const next = folder.decrementVertical(st.index)
    fn.toggleStyle(next)
  }, [folder, st, fn])

  const setFirstHorizontal = useCallback(() => {
    const next = folder.firstHorizontal(st.index)
    fn.toggleStyle(next)
  }, [fn, st, folder])

  const setLastHorizontal = useCallback(() => {
    const next = folder.lastHorizontal(st.index)
    fn.toggleStyle(next)
  }, [fn, st, folder])

  const setFirstVertical = useCallback(() => {
    const next = folder.firstVertical(st.index)
    fn.toggleStyle(next)
  }, [fn, st, folder])

  const setLastVertical = useCallback(() => {
    const next = folder.lastVertical(st.index)
    fn.toggleStyle(next)
  }, [fn, st, folder])

  const clear = useCallback(() => {
    fn.toggleStyle(null)
  }, [fn])

  const createHandleClick = useCallback(
    (i: number): MouseEventHandler => {
      return (ev) => {
        const next = clickedChildIndex(ev) + i * props.foldSize
        fn.toggleStyle(next)
      }
    },
    [fn, props]
  )

  const isActive = st.isStyled.some((e) => e)
  const arr2d = reshapeJagged2D(st.elements, props.foldSize).value.map(
    (arr1d, i) => (
      <div
        key={i}
        css={horizonStyle}
        onClick={createHandleClick(i)}
      >
        {arr1d}
      </div>
    )
  )

  const wrapped = useMemo(
    () => <div css={props.style}>{arr2d}</div>,
    [arr2d, props]
  )

  return [
    {
      wrapped,
      isStyled: st.isStyled,
      isActive,
    },
    {
      ...fn,
      incHorizontal,
      decHorizontal,
      incVertical,
      decVertical,
      setFirstHorizontal,
      setLastHorizontal,
      setFirstVertical,
      setLastVertical,
      clear,
    },
  ]
}

export default useActivation2D
