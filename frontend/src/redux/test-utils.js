import React from "react";
import { render as rtlRender } from "@testing-library/react";
// import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import { createMemoryHistory } from "history";

import rootReducer from "./root-reducer";

const render = (
  ui,
  {
    initialState,
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
    store = configureStore({
      reducer: rootReducer,
      middleware: [thunk],
      preloadedState: initialState,
    }),
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    );
  }
  return {
    render: rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  };
};

export * from "@testing-library/react";

export { render };
