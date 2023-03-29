import { Navigate, Route, Routes } from "react-router-dom";
// import Concept from "../components/Concept";

import { CreateConcept } from "../components/CreateConcept";
import { ReadConcept } from "../components/ReadConcepts";


export const ConceptRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<>
          {/* <Concept /> */}
          <CreateConcept />
          <ReadConcept />
        </>}
      />
    </Routes>
  );
};
