import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TaskProvider } from "./context/TaskContext.tsx";
import { TagProvider } from "./context/TagContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TagProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </TagProvider>
  </StrictMode>
);
