import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TaskProvider } from "./context/TaskContext.tsx";
import { TagProvider } from "./context/TagContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskProvider>
      <TagProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </TagProvider>
    </TaskProvider>
  </StrictMode>
);
