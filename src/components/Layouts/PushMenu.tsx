import * as React from "react";
import styled from "styled-components";
import { space, color, shadow } from "src/theme";
import { animated, useSpring } from "react-spring";
import { useMedia } from "src/hooks/useMedia";

const width = "250px";

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  z-index: 0;
  overflow-x: hidden;
`;

const Main = styled(animated.div)`
  z-index: 99;
  height: 100%;
  background: ${color("grey.100")};
  transition: 400ms ease-out;
  box-shadow: ${shadow(1)};
  overflow-x: hidden;
  min-width: 400px;
`;
const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  overflow: auto;
  width: ${width};
  background: ${color("grey.400")};
  height: 100vh;
`;

const TopBar = styled.div`
  width: 100%;
  padding: ${space(2)};
  position: fixed;
  top: 0;
  background: ${color("divider.light")};
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
    marginLeft: open ? width : "0px",
  });
  return (
    <Root>
      <Sidebar>
        <div>content</div>
      </Sidebar>
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
    </Root>
  );
};

export { PushMenu };
