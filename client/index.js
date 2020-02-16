import React from "react";
import { render } from "react-dom";
//components
import App from "./app";
//redux
import { Provider } from "react-redux";
//redux store
import { Store } from "./redux/store";
//react-router-dom
import { BrowserRouter } from "react-router-dom";

render(
  <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
