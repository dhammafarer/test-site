import * as React from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "src/theme";
import { StateProvider } from "src/context/StateContext";

import { Normalize } from "styled-normalize";

export const BaseLayout: React.SFC<{}> = ({ children }) => {
  return (
    <StateProvider>
      <ThemeProvider theme={defaultTheme}>
        <div>
          <Normalize />
          <div>{children}</div>
        </div>
      </ThemeProvider>
    </StateProvider>
  );
};

export default BaseLayout;
