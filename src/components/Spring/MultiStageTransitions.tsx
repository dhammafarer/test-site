import React, { useRef, useState, useEffect, useCallback } from "react";
import { useTransition, animated } from "react-spring";
import styled from "styled-components";

const Root = styled.div`
  overflow: hidden;
  margin: 0;
  padding: 0;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TransitionItem = styled(animated.div)`
  width: 400px;
  overflow: hidden;
  width: 100%;
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 5em;
  font-weight: 800;
  text-transform: uppercase;
  will-change: transform, opacity, height;
  white-space: nowrap;
  cursor: pointer;
  line-height: 80px;
`;

const MultiStageTransitions: React.SFC<{}> = () => {
  const ref = useRef([] as any[]);
  const [items, set] = useState([] as string[]);
  const transitions = useTransition(items, null, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: "perspective(600px) rotateX(0deg)",
      color: "#8fa5b6",
    },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80 },
      { transform: "perspective(600px) rotateX(180deg)", color: "#28d79f" },
      { transform: "perspective(600px) rotateX(0deg)" },
    ],
    leave: [
      { color: "#c23369" },
      { innerHeight: 0 },
      { opacity: 0, height: 0 },
    ],
    update: { color: "#28b4d7" },
  });

  const reset = useCallback(() => {
    ref.current.map(clearTimeout);
    ref.current = [];
    set([]);
    ref.current.push(
      setTimeout(() => set(["First", "Oranges", "Third"]), 2000)
    );
    ref.current.push(setTimeout(() => set(["First", "Third"]), 5000));
    ref.current.push(
      setTimeout(() => set(["First", "Bananas", "Third"]), 8000)
    );
  }, []);

  useEffect(() => void reset(), []);

  return (
    <Root>
      {transitions.map(({ item, props: { innerHeight, ...rest }, key }) => (
        <TransitionItem key={key} style={rest} onClick={reset}>
          <animated.div style={{ overflow: "hidden", height: innerHeight }}>
            {key}
          </animated.div>
        </TransitionItem>
      ))}
    </Root>
  );
};

export { MultiStageTransitions };
