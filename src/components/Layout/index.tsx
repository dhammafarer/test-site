import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../theme";

import { Normalize } from "styled-normalize";

const Main = styled.div`
  padding: 50px;
`;

export const BaseLayout: React.SFC<{}> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <div>
      <Normalize />
      <Main>{children}</Main>
    </div>
  </ThemeProvider>
);

export const Layout = BaseLayout;
