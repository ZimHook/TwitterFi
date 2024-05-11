import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { StoreProvider } from "./context";
import App from "./App";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
