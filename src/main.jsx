import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Home, TaskDashboard, About, Stats, ErrorPage } from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from './app/store.js'
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },

      {
        path: "/task/:taskId",
        element: <TaskDashboard />,
      },
      
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/stats",
        element: <Stats />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store= {store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
