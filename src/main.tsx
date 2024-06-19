import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { injectTheme, getTheme } from "../styled-system/themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const theme = await getTheme("dark");
injectTheme(document.documentElement, theme);
