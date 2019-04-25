import * as React from "react";
import { useMedia } from "src/hooks/useMedia";
import { useMeasure } from "src/hooks/useMeasure";
import { Box } from "primithemes";
import { animated as a, useTransition } from "react-spring";

const Grid: React.SFC<{}> = () => {
  const data = [
    { id: 1, height: 150 },
    { id: 2, height: 150 },
    { id: 3, height: 150 },
    { id: 4, height: 150 },
    { id: 5, height: 150 },
    { id: 6, height: 150 },
  ];

  const columns = useMedia(
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    [5, 4, 3],
    2
  );
  const [bind, { width }] = useMeasure();
  const [items] = React.useState(data);

  let heights = new Array(columns).fill(0);
  let gridItems = items.map((child, i) => {
    const column = i % columns;
    const xy = [
      (width / columns) * column,
      (heights[column] += child.height) - child.height,
    ];
    const res = { ...child, xy, width: width / columns, height: child.height };
    console.log(res);
    return res;
  });

  const transitions = useTransition(gridItems, item => item.id, {
    from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
    enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1 }),
    update: ({ xy, width, height }) => ({ xy, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

  return (
    <div
      {...bind}
      style={{ position: "relative", height: Math.max(...heights) }}
    >
      {transitions.map(({ item, props: { xy, ...rest }, key }) => (
        <a.div
          key={key}
          style={{
            position: "absolute",
            transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`),
            ...rest,
          }}
        >
          <Box bg="grey.200" style={{ height: "100%" }}>
            content
          </Box>
        </a.div>
      ))}
    </div>
  );
};

export { Grid };
