import React from "react";
import { StyleProvider, ThemePicker } from "vcc-ui";

import "../public/css/styles.css";
import { HomePage } from "../src/pages/HomePage";

function AppPage() {
  return (
    <React.StrictMode>
      <StyleProvider>
        <ThemePicker variant="light">
          <HomePage />
        </ThemePicker>
      </StyleProvider>
    </React.StrictMode>
  );
}

export default AppPage;
