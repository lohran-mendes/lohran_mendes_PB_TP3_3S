import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { SearchProvider } from "./contexts/SearchContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>,
);
