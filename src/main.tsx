import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { pageOrder, type PageKey } from "./app-data";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No se encontro el nodo root.");
}

const supportedPages: PageKey[] = pageOrder;

const pageFromDataset = rootElement.dataset.page;

const page: PageKey = pageFromDataset && supportedPages.includes(pageFromDataset as PageKey)
  ? (pageFromDataset as PageKey)
  : "home";

createRoot(rootElement).render(
  <StrictMode>
    <App page={page} />
  </StrictMode>,
);
