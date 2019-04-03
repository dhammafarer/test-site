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

const Loader: React.SFC<{}> = () => {
  const [{ ui }] = useStateValue();
  console.log("rerender load");
  return <div>{ui.loading ? "loading" : "idle"}</div>;
};

const Items: React.SFC<{}> = () => {
  const [{ inquiry }] = useStateValue();
  return (
    <div>
      {inquiry.wines.map((x, i) => (
        <div key={i}>{x}</div>
      ))}
    </div>
  );
};

const IndexPage: React.SFC<{}> = props => {
  return (
    <div>
      <Loader />
      <Items />
      <Button />
    </div>
  );
};

export default IndexPage;
