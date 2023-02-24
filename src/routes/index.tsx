import { useRoutes } from "react-router-dom";

import { ConceptRoutes } from "@/features/concept/routes";

const routes = [
  {
    path: "/",
    element: <ConceptRoutes />,
  },
  {
    path: "/index.html",
    element: <ConceptRoutes />,
  },
];

export const AppRoutes = () => {
  const element = useRoutes([...routes]);

  return <>{element}</>;
};
