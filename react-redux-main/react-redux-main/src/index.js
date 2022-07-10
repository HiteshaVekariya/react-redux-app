import React from "react";
import App from "./App";
import "./index.css";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/store";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
     </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);

reportWebVitals();
