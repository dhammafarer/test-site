import * as React from "react";
import sc from "styled-components";
import Faker from "faker";
import { Box } from "src/components/Box";

const Div = sc.div`
  background: ${props => props.theme.colors.primary.dark};
`;

const Perf: React.SFC<{ title: string }> = ({ title, children }) => {
  window.performance.mark(`${title}-start`);
  React.useEffect(() => {
    window.performance.mark(`${title}-end`);
    window.performance.measure(title, `${title}-start`, `${title}-end`);
    console.log(title, window.performance.getEntriesByName(title)[0].duration);
  });
  return <div>{children}</div>;
};

const list = Array(500).fill({ title: Faker.lorem.sentence });

const IndexPage: React.SFC<{}> = props => {
  const [show, set] = React.useState(false);
  const [show2, set2] = React.useState(false);
  const [show3, set3] = React.useState(false);
  return (
    <div>
      <button onClick={() => set(!show)}>show</button>
      <button onClick={() => set2(!show2)}>show2</button>
      <button onClick={() => set3(!show3)}>show3</button>
      {show && (
        <Perf title="div">
          {list.map((x, i) => (
            <div style={{ background: "green" }} key={i}>
              {x.title()}
            </div>
          ))}
        </Perf>
      )}
      {show2 && (
        <Perf title="box">
          {list.map((x, i) => (
            <Box key={i} color="text.light">
              {x.title()}
            </Box>
          ))}
        </Perf>
      )}
      {show3 && (
        <Perf title="Div">
          {list.map((x, i) => (
            <Div key={i}>{x.title()}</Div>
          ))}
        </Perf>
      )}
    </div>
  );
};

export default IndexPage;
