import * as React from "react";
import { useDispatch, useStateValue } from "src/context/StateContext";

const Button: React.SFC<{}> = () => {
  console.log("rerender button");
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch({ type: "addItem", item: "new" })}>
        add
      </button>
      <button onClick={() => dispatch({ type: "reset" })}>reset</button>
    </div>
  );
};

const Loader: React.SFC<{ loading: boolean }> = props => {
  console.log("rerender load");
  return <div>{props.loading ? "loading" : "idle"}</div>;
};

const Items: React.SFC<{}> = () => {
  const { inquiry } = useStateValue();
  return (
    <div>
      {inquiry.wines.map((x, i) => (
        <div key={i}>{x}</div>
      ))}
    </div>
  );
};

const IndexPage: React.SFC<{}> = props => {
  const { ui } = useStateValue();
  React.useEffect(() => {
    console.log(ui);
  }, [ui]);
  return (
    <div>
      <Loader loading={ui.loading} />
      <Items />
      <Button />
    </div>
  );
};

export default IndexPage;
