require("./bootstrap");

import { App } from "@inertiajs/inertia-react";
import React from "react";
import { render } from "react-dom";
import { InertiaProgress } from "@inertiajs/progress";
import { StylesProvider } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  hideProgressBar: true,
  limit: 3,
});

const el = document.getElementById("app");

render(
  <StylesProvider injectFirst>
    <App
      initialPage={JSON.parse(el.dataset.page)}
      resolveComponent={(name) => require(`./Pages/${name}`).default}
    />
  </StylesProvider>,
  el
);

InertiaProgress.init({ color: "#4B5563" });
