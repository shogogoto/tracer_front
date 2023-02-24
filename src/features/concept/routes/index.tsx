import { Navigate, Route, Routes } from "react-router-dom";

import { CreateConcept } from "../components/CreateConcept";

export const ConceptRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<CreateConcept />} />
    </Routes>
  );
};
