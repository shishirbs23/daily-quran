import React from "react";
import ReactDOM from "react-dom/client";

// Global CSS
import "./index.css";

// Router
import { RouteProvider } from "./routing/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouteProvider />
  </React.StrictMode>
);
