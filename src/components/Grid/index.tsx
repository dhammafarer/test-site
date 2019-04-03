import * as React from "react";
import { useMedia } from "./useMedia";
import { useMeasure } from "./useMeasure";
import { Box } from "primithemes";
import { animated as a, useTransition } from "react-spring";

const Grid: React.SFC<{}> = () => {
  const data = [
    { id: 1, height: 200 },
    { id: 2, height: 200 },
    { id: 3, height: 200 },
    { id: 4, height: 200 },
    { id: 5, height: 200 },
    { id: 6, height: 200 },
  ];

  const columns = useMedia(
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    [5, 4, 3],
    2
  );
  const [bind, { width }] = useMeasure();
  const [items, set] = React.useState(data);

  let heights = new Array(columns).fill(0); // Each column gets a height starting with zero
  let gridItems = items.map((child, i) => {
    const column = heights.indexOf(Math.min(...heights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
    const xy = [
      (width / columns) * column,
      (heights[column] += child.height / 2) - child.height / 2,
    ]; // X = container width / number of columns * column index, Y = it's just the height of the current column
    return { ...child, xy, width: width / columns, height: child.height / 2 };
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
    <div {...bind} style={{ height: Math.max(...heights) }}>
      {transitions.map(({ item, props: { xy, ...rest }, key }) => (
        <a.div
          key={key}
          style={{
            transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`),
            ...rest,
          }}
        >
          <Box bg="grey.200" style={{ height: "100%" }} m={1}>
            content
          </Box>
        </a.div>
      ))}
    </div>
  );
};

export { Grid };
