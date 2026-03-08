import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("[LocalBot] App starting...");

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(<App />);
  console.log("[LocalBot] App rendered");
} else {
  console.error("[LocalBot] Root element not found!");
}
