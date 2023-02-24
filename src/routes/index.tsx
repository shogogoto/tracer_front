import { useRoutes, useLocation } from "react-router-dom";

import { ConceptRoutes } from "@/features/concept/routes";

const routes = [
  {
    path: "/",
    element: <ConceptRoutes />,
  },
  {
    path: "/react-app-shogogoto/index.html",
    element: <ConceptRoutes />,
  },
];

export const AppRoutes = () => {
  const location = useLocation();
  console.log(location);

  const element = useRoutes([...routes]);

  return <>{element}</>;
};
