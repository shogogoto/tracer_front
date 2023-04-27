import { useRoutes } from "react-router-dom"
import { type FC } from "react"
import { ConceptRoutes } from "@/features/concept/routes"

const routes = [
  {
    path: "/",
    element: <ConceptRoutes />,
  },
  {
    path: "/test/*",
    element: <div>test sub url</div>,
  },
]

export const AppRoutes: FC = () => {
  const element = useRoutes([...routes])

  return <>{element}</>
}
