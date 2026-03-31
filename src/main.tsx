import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No se encontro el nodo root.");
}

const page = (rootElement.dataset.page as "home" | "services" | "process" | "about" | "contact" | undefined) ?? "home";

createRoot(rootElement).render(
  <StrictMode>
    <App page={page} />
  </StrictMode>,
);
