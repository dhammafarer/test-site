import * as React from "react";
import styled, { css } from "styled-components";
import { space, color, shadow } from "src/theme";
import { animated, useSpring } from "react-spring";
import { tablet } from "src/theme/media";
import { useMedia } from "src/hooks/useMedia";

const width = "250px";

const Root = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 100vh;
  max-height: 100vh;
`;

const Main = styled(animated.div)`
  z-index: 1;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate3d(0px, 0, 0);
  right: 0;
  bottom: 0;
  background: ${color("grey.100")};
  transition: left 400ms ease-out;
  box-shadow: ${shadow(1)};
  overflow-x: hidden;
  overflow-x: auto;
  ${tablet(css`
    left: 10px;
  `)}
`;
const Sidebar = styled(animated.div)`
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0px;
  bottom: 0;
  overflow: auto;
  width: ${width};
  background: ${color("grey.400")};
  height: 100vh;
  transition: left 400ms ease-out;
`;

const TopBar = styled.div`
  width: 100%;
  padding: ${space(2)};
`;
const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  border: 1px solid ${color("white.light")};
`;

const Section = styled.div<{ i: number }>`
  height: 50vh;
  padding: ${space(3)};
  background: ${props => color(`grey.${(props.i % 2) + 1}00`)};
`;

const PushMenu: React.SFC<{}> = ({ children }) => {
  const val = useMedia(["(min-width: 600px)"], [true], false);
  const [open, toggle] = React.useState(() => (val ? true : false));
  const props = useSpring({
    left: val && open ? width : val ? "50px" : "0px",
    transform:
      !val && open ? `translate3d(${width},0,0)` : "translate3d(0px,0,0)",
  });
  React.useEffect(() => void console.log(val));
  return (
    <Root>
      <Main style={props}>
        <TopBar>
          <button onClick={() => toggle(!open)}>toggle</button>
        </TopBar>
        <Container>
          {["first", "second", "third"].map((x, i) => (
            <Section i={i} key={i}>
              {x}
            </Section>
          ))}
        </Container>
      </Main>
      <Sidebar>sidebar</Sidebar>
    </Root>
  );
};

export { PushMenu };
