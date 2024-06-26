import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";

import "./custom.scss";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
