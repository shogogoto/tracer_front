import type { ReactNode, ReactElement, RefObject } from "react"

export type Rotatable = ReactNode | ReactNode[]
export type Activatable = ReactElement<{ ref: RefObject<HTMLElement> }>
export type Activatables = Activatable | Activatable[]
export type Activatables2D = Activatable | Activatable[][]

export type Index = number | null
export type IndexOperation = (i: Index) => Index
