import { type FC } from "react"

import "./App.css"
import { AppProvider } from "@/providers"
import { AppRoutes } from "@/routes"


const App: FC = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

export default App
