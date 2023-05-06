import * as React from "react"
import { type FC } from "react"
import { BrowserRouter } from "react-router-dom"

interface AppProviderProps {
  children: React.ReactNode
}

export const AppProvider: FC<AppProviderProps> = (props) => {
  return (
    <BrowserRouter basename={import.meta.env.VITE_ROUTE_BASE}>
      {props.children}
    </BrowserRouter>
  )
}
