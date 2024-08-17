import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App";
import TechStack from "./components/TechStack";
import LandingPage from "./components/LandingPage";
import ImageUpload from "./components/ImageUpload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App component wraps Navbar, Footer, and Outlet
    children: [
      {
        index: true, // Default route when navigating to '/'
        element: <LandingPage />,
      },
      {
        path: "techstack",
        element: <TechStack />,
      },
      {
        path: "contact",
        element: <h1>Contact</h1>,
      },
      {
        path: "process-image",
        element: <ImageUpload />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
