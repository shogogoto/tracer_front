import { useState } from "react";
import "./App.css";
import { AppProvider } from "@/providers";
import { AppRoutes } from "@/routes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
