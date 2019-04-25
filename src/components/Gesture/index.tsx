import * as React from "react";
import { animated, useSprings } from "react-spring";
import { clamp } from "ramda";
import { useGesture } from "react-with-gesture";
import styled from "styled-components";
import { color } from "src/theme";

const width = 500;

const Wrapper = styled(animated.div)`
  z-index: 0;
  margin: 1rem;
  width: ${width}px;
  height: 300px;
  background: ${color("divider.main")};
  border: 1px solid ${color("grey.800")};
  overflow: hidden;
  position: relative;
`;

const Card = styled.div`
  position: absolute;
  margin-right: 20px;
  width: 100%;
  height: 300px;
  z-index: 1;
`;

const els = [
  { background: "green" },
  { background: "blue" },
  { background: "red" },
];

const Example: React.SFC<{}> = () => {
  const index = React.useRef(0);
  const [props, set] = useSprings(els.length, i => ({
    x: i * width,
    display: "block",
  }));

  const bind = useGesture(
    ({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
      console.log(down, distance);
      if (down && distance > width / 2) {
        cancel(
          (index.current = clamp(
            0,
            els.length - 1,
            index.current + (xDir > 0 ? -1 : 1)
          ))
        );
      }
      set(i => {
        if (i < index.current - 1 && i > index.current + 1)
          return { display: "none" };
        const x = (i - index.current) * width + (down ? xDelta : 0);
        console.log("i :", index.current);
        return { x, display: "block" };
      });
    }
  );
  return (
    <div>
      <button onClick={() => (index.current = 2)}>setCur</button>
      <Wrapper>
        {props.map(({ x, display }, i) => (
          <animated.div
            {...bind()}
            key={i}
            style={{
              display,
              transform: x.interpolate(x => `translate3d(${x}px,0,0)`),
            }}
          >
            <Card style={{ background: els[i].background }} />
          </animated.div>
        ))}
      </Wrapper>
    </div>
  );
};

export { Example };
