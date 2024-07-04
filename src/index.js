import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { StoreProvider } from "./context";
import App from "./App";
import { ConfigProvider } from "antd";
import { Buffer } from 'buffer';

// @ts-ignore
window.Buffer = Buffer;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
