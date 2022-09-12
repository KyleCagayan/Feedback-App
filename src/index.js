// allows us to interact with the document object model in the browser
import React from "react";
import ReactDOM from "react-dom/client";

import './index.css'

import App from "./App";

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
