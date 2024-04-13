import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./components/pages/Shop.jsx";
import Item from "./components/pages/Item.jsx";
import { CartProvider } from "./components/CartContext.jsx";
import CheckOut from "./components/pages/CheckOut.jsx";
import Layout from "./Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
  {
    path: "/shop",
    element: (
      <Layout>
        <Shop />
      </Layout>
    ),
  },
  {
    path: "/shop/:itemId",
    element: (
      <Layout>
        <Item />
      </Layout>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Layout>
        <CheckOut />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
