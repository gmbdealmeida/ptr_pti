import React from "react";
import { render, screen, within } from "@testing-library/react";
import { createMemoryHistory } from "history";
import App from "../../App";
import Home from "./home";
import { Router } from "react-router";
import Swiper from "swiper";

//Test da página funcionar
test("landing on the home page", () => {
  const history = createMemoryHistory();
  history.push("/home"); //imaginar o link no URL e não a path dos ficheiros
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect.anything();
});

