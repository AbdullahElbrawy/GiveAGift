import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./i18n";
import "./index.css";
import { useNavigate } from 'react-router-dom';

import ErrorBoundary from './components/errorBoundary'


 // Import the ErrorBoundary component
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />


  </StrictMode>
);
