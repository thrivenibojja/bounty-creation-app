import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BountyFormProvider } from "./context/BountyFormContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BountyFormProvider>
      <App />
    </BountyFormProvider>
  </React.StrictMode>
);
