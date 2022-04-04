/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

// colortown context provider
import { ColorTownProvider } from "./context/colortown";
import { AuthContextProvider } from "./context/colortown/AuthContext";

ReactDOM.render(
  <BrowserRouter>
    <SoftUIControllerProvider>
      <ColorTownProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ColorTownProvider>
    </SoftUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
