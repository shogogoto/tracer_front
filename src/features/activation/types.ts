import type { ReactNode, ReactElement, RefObject } from "react"

export type Rotatable = ReactNode | ReactNode[]
export type Activatable = ReactElement<{ ref: RefObject<HTMLElement> }>
export type ActivatableChildren = Activatable | Activatable[]
