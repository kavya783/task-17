import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./GlobalStyles.css";
import { Provider } from "react-redux";
import store from "./redux/store"; // <-- store path correct ga undali

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


reportWebVitals();