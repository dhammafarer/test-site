import * as React from "react";
import styled from "styled-components";
import { space, color } from "src/theme";
import { doublePica } from "src/theme/typography";
import { useSpring, animated } from "react-spring";
import { useMeasure } from "src/hooks/useMeasure";

const Box = styled.div`
  margin: ${space(3)};
  padding: ${space(3)};
  border: 1px solid ${color("grey.200")};
`;

const Title = styled.div`
  ${doublePica};
`;
const Toggle = styled.button``;

const Stock = styled(animated.div)`
  margin-top: ${space(2)};
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
`;

const Card = styled.div`
  padding: ${space(2)};
  background: ${color("grey.200")};
  border-radius: 4px;
`;

const usePrevious = (value: any) => {
  const ref = React.useRef();
  React.useEffect(() => void (ref.current = value), [value]);
  return ref.current;
};

const Spring: React.SFC<{}> = () => {
  const [show, toggle] = React.useState(false);
  const [bind, { height: viewHeight }] = useMeasure();
  const previous = usePrevious(show);
  const { height, opacity } = useSpring({
    from: { height: 0, opacity: 0 },
    to: { height: show ? viewHeight : 0, opacity: show ? 1 : 0 },
  });
  return (
    <Box>
      <Title>Box</Title>
      <Toggle onClick={() => toggle(!show)}>{show ? "hide" : "show"}</Toggle>
      <Stock
        style={{ height: show && previous === show ? "auto" : height, opacity }}
      >
        <animated.div {...bind}>
          <Content>
            {["one", "two", "three", "four"].map(x => (
              <div key={x} style={{ padding: "4px" }}>
                <Card>{x}</Card>
              </div>
            ))}
          </Content>
        </animated.div>
      </Stock>
    </Box>
  );
};

export { Spring };
