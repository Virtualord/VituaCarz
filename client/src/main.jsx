import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import App from "./App.jsx";
import { store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <App />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="dark"
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);