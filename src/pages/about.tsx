import * as React from "react";
import { useStateValue } from "src/context/StateContext";

const Button: React.SFC<{}> = () => {
  const [, dispatch] = useStateValue();
  return (
    <div>
      <button onClick={() => dispatch({ type: "addItem", item: "new" })}>
        add
      </button>
      <button onClick={() => dispatch({ type: "reset" })}>reset</button>
    </div>
  );
};

const Items: React.SFC<{}> = () => {
  const [state, dispatch] = useStateValue();
  React.useEffect(() => {
    dispatch({ type: "fetchState" });
  }, []);
  return (
    <div>
      {state.wines.map((x, i) => (
        <div key={i}>{x}</div>
      ))}
    </div>
  );
};

const IndexPage: React.SFC<{}> = props => {
  return (
    <div>
      <Items />
      <Button />
    </div>
  );
};

export default IndexPage;
