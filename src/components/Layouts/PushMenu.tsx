import * as React from "react";
import styled, { css } from "styled-components";
import { space, color, shadow } from "src/theme";
import { animated, useSpring } from "react-spring";
import { useMedia } from "src/hooks/useMedia";

const width = "250px";

const Root = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  overflow: hidden;
  height: 100vh;
  max-height: 100vh;
`;

const Main = styled(animated.div)`
  z-index: 1;
  flex-grow: 1;
  height: 100%;
  background: ${color("grey.100")};
  transition: left 400ms ease-out;
  box-shadow: ${shadow(1)};
  overflow-x: hidden;
  overflow-y: scroll;
  min-width: 400px;
`;
const Sidebar = styled(animated.div)`
  z-index: 0;
  flex: 0 0 auto;
  overflow: auto;
  width: ${width};
  background: ${color("grey.400")};
  height: 100vh;
`;

const TopBar = styled.div`
  width: 100%;
  padding: ${space(2)};
  position: sticky;
  top: 0;
  left: 0;
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
    width: open ? width : "0px",
    background: open ? color("grey.200") : color("grey.400"),
    overflow: open ? "auto" : "hidden",
  });
  return (
    <Root>
      <Sidebar style={props}>
        <div style={{ height: "140vh" }}>content</div>
      </Sidebar>
      <Main>
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
