import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { MainProvider } from "./context/main_context";

render(
  <MainProvider>
    <App />
  </MainProvider>,
  document.getElementById("root")
);
