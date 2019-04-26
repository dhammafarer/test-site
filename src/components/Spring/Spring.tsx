import * as React from "react";
import styled from "styled-components";
import { radius, space, color } from "src/theme";
import { doublePica } from "src/theme/typography";
import { useSpring, useTrail, animated } from "react-spring";
import { useMeasure } from "src/hooks/useMeasure";

const Box = styled.div`
  & * {
    box-sizing: border-box;
  }
  margin: ${space(3)};
  padding: ${space(3)};
  border: 1px solid ${color("grey.200")};
`;

const Title = styled.div`
  ${doublePica};
`;

const Toggle = styled.button`
  margin-bottom: 0;
  padding: 0;
  appearance: none;
  border: 1px solid ${color("divider.main")};
  border-radius: ${radius(2)};
  background: none;
  cursor: pointer;
  outline: none;
  text-transform: capitalize;
  position: relative;
  overflow: hidden;
  height: 40px;
`;

const Inner = styled(animated.div)`
  height: 100%;
`;

const Item = styled(animated.div)<{ bg: string }>`
  display: flex;
  padding: ${space(2)};
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100px;
  &:hover,
  &:active {
    background: ${color("grey.100")};
  }
  &:first-child {
    background: ${color("grey.200")};
    &:hover {
      background: ${color("grey.300")};
    }
  }
`;

const Stock = styled(animated.div)`
  margin-top: ${space(2)};
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Card = styled.div`
  padding: ${space(2)};
  background: ${color("grey.200")};
  border-radius: 4px;
`;

const Button: React.SFC<{ active: boolean; onClick: any }> = ({
  active,
  children,
  ...rest
}) => {
  const props = useSpring({
    y: active ? "0%" : "-100%",
  });
  return (
    <Toggle {...rest}>
      <Inner
        style={{
          transform: props.y.interpolate(y => `translate3d(0,${y},0)`),
        }}
      >
        <Item>Hide</Item>
        <Item>Show</Item>
      </Inner>
    </Toggle>
  );
};

const usePrevious = (value: any) => {
  const ref = React.useRef();
  React.useEffect(() => void (ref.current = value), [value]);
  return ref.current;
};

const items = ["one", "two", "three", "four"];

const Spring: React.SFC<{}> = () => {
  const [show, toggle] = React.useState(false);
  const [bind, { height: viewHeight }] = useMeasure();
  const previous = usePrevious(show);
  const { height, opacity } = useSpring({
    from: { height: 0, opacity: 0 },
    to: { height: show ? viewHeight : 0, opacity: show ? 1 : 0 },
  });
  const trail = useTrail(items.length, { opacity: show ? 1 : 0 });
  return (
    <Box>
      <Title>Box</Title>
      <Button active={show} onClick={() => toggle(!show)} />
      <Stock
        style={{ height: show && previous === show ? "auto" : height, opacity }}
      >
        <animated.div {...bind}>
          <Content>
            {trail.map(({ opacity }, i) => (
              <animated.div
                key={i}
                style={{ width: "50%", opacity, padding: "4px" }}
              >
                <Card>{items[i]}</Card>
              </animated.div>
            ))}
          </Content>
        </animated.div>
      </Stock>
    </Box>
  );
};

export { Spring };
