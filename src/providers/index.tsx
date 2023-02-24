import * as React from "react";
import { BrowserRouter } from "react-router-dom";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <BrowserRouter basename={import.meta.env.VITE_ROUTE_BASE}>
      {children}
    </BrowserRouter>
  );
};
