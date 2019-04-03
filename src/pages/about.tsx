import * as React from "react";
import shuffle from "lodash.shuffle";
import { styled, Box, Flex } from "primithemes";
import { useTransition, animated } from "react-spring";
import {
  useDispatch,
  useUIValue,
  useInquiryValue,
} from "src/context/StateContext";

const Table = styled.table`
  & thead {
    border: ${props => props.theme.borders[1]};
  }
  & td {
    background: ${props => props.theme.colors.grey[100]};
  }
`;

const Buttons: React.SFC<{}> = () => {
  console.log("buttons");
  const dispatch = useDispatch();
  const addItem = () => {
    dispatch({ type: "loadingOn" });
    setTimeout(() => {
      dispatch({
        type: "addItem",
        item: {
          wineId: new Date()
            .valueOf()
            .toString()
            .slice(-3),
        },
      });
      dispatch({ type: "loadingOff" });
    }, 100);
  };
  return (
    <div>
      <button onClick={addItem}>add</button>
      <button onClick={() => dispatch({ type: "reset" })}>reset</button>
      <button onClick={() => dispatch({ type: "shuffleItems" })}>
        shuffle
      </button>
      <button onClick={() => dispatch({ type: "loadingOn" })}>Start</button>
      <button onClick={() => dispatch({ type: "loadingOff" })}>Stop</button>
    </div>
  );
};

const RemoveButton: React.SFC<{ idx: number }> = ({ idx }) => {
  console.log("remove button");
  const dispatch = useDispatch();
  const removeItem = (idx: number) => {
    dispatch({ type: "removeItem", idx });
  };
  return (
    <div>
      <button onClick={() => removeItem(idx)}>x</button>
    </div>
  );
};

const Loader: React.SFC<{}> = () => {
  console.log("loading");
  const { loading } = useUIValue();
  return <div>{loading ? "loading" : "idle"}</div>;
};

const Item: React.SFC<{ value: { wineId: string } }> = ({ value }) => {
  return <span>{value.wineId}</span>;
};

const ItemsTable: React.SFC<{}> = () => {
  const { wines } = useInquiryValue();
  console.log("items");
  const transitions = useTransition(wines, wine => wine.wineId, {
    from: { height: 0 },
    enter: { height: 100 },
    leave: { height: 0 },
  });
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>item</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {transitions.map(({ item, key, props }, i) => (
            <animated.tr key={key} style={props}>
              <td>
                <Item value={item} />
              </td>
              <td>
                <RemoveButton idx={i} />
              </td>
            </animated.tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const ItemsGrid: React.SFC<{ wines: { wineId: string }[] }> = ({ wines }) => {
  const transitions = useTransition(wines, wine => wine.wineId, {
    enter: { opacity: 1 },
    from: { opacity: 0 },
    leave: { opacity: 0 },
  });
  return (
    <Flex flexWrap="wrap">
      {transitions.map(({ item, key, props }, i) => (
        <animated.div key={i} style={{ ...props, width: "25%", padding: 10 }}>
          <Box bg="grey.200" p={4}>
            <div>
              <Item value={item} />
            </div>
            <div>
              <RemoveButton idx={i} />
            </div>
          </Box>
        </animated.div>
      ))}
    </Flex>
  );
};

const IndexPage: React.SFC<{}> = props => {
  const { wines } = useInquiryValue();
  return (
    <div>
      <Loader />
      <Buttons />
      <ItemsGrid wines={wines} />
    </div>
  );
};

export default IndexPage;
