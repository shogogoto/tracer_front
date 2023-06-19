import { type FC } from "react"
import { Route, Routes } from "react-router-dom"

export const ConceptRoutes: FC = () => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <>
            <div>developing now</div>
          </>
        }
      />
    </Routes>
  )
}
