import * as React from "react";
import styled from "styled-components";
import { color, space } from "src/theme";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${color("grey.800")};
`;

const Inner = styled.div`
  color: ${color("white.light")};
  padding-top: ${space(4)};
  padding: ${space(2)};
`;

interface Props {
  open: boolean;
}

const Menu: React.SFC<Props> = ({ open }) => {
  return (
    <Wrapper>
      <Inner>content</Inner>
    </Wrapper>
  );
};

export { Menu };
