import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Home, TaskDashboard, About, Stats, ErrorPage } from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./app/store.js";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import { persistor } from "./app/store.js";

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
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
