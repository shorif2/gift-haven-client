import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./route/Router.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import ShopProvider from "./provider/ShopProvider.jsx";
import UserProvider from "./provider/UserProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <ShopProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ShopProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);
