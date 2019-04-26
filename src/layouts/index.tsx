import * as React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { defaultTheme } from "src/theme";
import { StateProvider } from "src/context/StateContext";
import styled from "styled-components";

import { Normalize } from "styled-normalize";

const Root = styled.div``;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    overflow-x: hidden;
  }
`;

export const BaseLayout: React.SFC<{}> = ({ children }) => {
  return (
    <StateProvider>
      <ThemeProvider theme={defaultTheme}>
        <Root>
          <GlobalStyle />
          <Normalize />
          {children}
        </Root>
      </ThemeProvider>
    </StateProvider>
  );
};

export default BaseLayout;
