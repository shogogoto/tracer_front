import { useRoutes, useLocation } from "react-router-dom";

import { ConceptRoutes } from "@/features/concept/routes";

const routes = [
  {
    path: "/",
    element: <ConceptRoutes />,
  },
  {
    path: "/test",
    element: <ConceptRoutes />,
  },
];

console.log(location);
console.log(import.meta.env.MODE);
console.log(import.meta.env.PROD);
console.log(import.meta.env.DEV);
console.log(import.meta.env.VITE_ROUTE_BASE);
console.log(import.meta.env);
export const AppRoutes = () => {
  const location = useLocation();
  const element = useRoutes([...routes]);

  return <>{element}</>;
};
