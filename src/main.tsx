import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "../node_modules/primeflex/primeflex.css";
import "../node_modules/primeicons/primeicons.css";
import "../node_modules/primereact/resources/primereact.min.css";
import "../node_modules/primereact/resources/themes/lara-light-blue/theme.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
