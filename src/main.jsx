import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { DarkModeProvider } from "./context/DarkModeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkModeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </DarkModeProvider>
  </StrictMode>,
);
