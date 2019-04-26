import * as React from "react";
import styled, { css } from "styled-components";
import { space, color, shadow } from "src/theme";
import { animated, useSpring } from "react-spring";
import { useMedia } from "src/hooks/useMedia";
import { desktop } from "src/theme/media";
import { Menu } from "./Menu";
import { FormatIndentDecrease } from "styled-icons/material/FormatIndentDecrease";
import { FormatIndentIncrease } from "styled-icons/material/FormatIndentIncrease";
import Faker from "faker";

const content = Faker.lorem.paragraphs();

const width = "250px";

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  z-index: 0;
`;

const Main = styled(animated.div)`
  position: relative;
  z-index: 2;
  height: 100%;
  background: ${color("grey.100")};
  transition: 400ms ease-out;
  box-shadow: ${shadow(1)};
  min-width: 100%;
  ${desktop(css`
    min-width: auto;
  `)}
`;

const TopBar = styled.div`
  position: sticky;
  top: 0px;
  background: transparent;
  border-bottom: 1px solid ${color("white.light")};
`;

const Toggle = styled.button<{ open: boolean }>`
  position: static;
  -webkit-appearance: none;
  outline: none;
  background: transparent;
  border: none;
  color: ${color("text.main")};
  top: ${space(2)};
  left: ${space(2)};
  width: 48px;
  height: 48px;
  border-radius: 50%;
  &:hover {
    background: ${color("white.main")};
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  overflow-x: hidden;
  overflow-y: auto;
  width: ${width};
  background: ${color("grey.200")};
  height: 100vh;
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
        <Menu open={open} />
      </Sidebar>
      <Main style={props}>
        <TopBar>
          <Toggle open={open} onClick={() => toggle(!open)}>
            {open ? (
              <FormatIndentDecrease size={24} />
            ) : (
              <FormatIndentIncrease size={24} />
            )}
          </Toggle>
        </TopBar>
        <Container>
          {[content, "second", "third"].map((x, i) => (
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
