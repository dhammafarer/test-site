import * as React from "react";
import {
  useDispatch,
  useUIValue,
  useInquiryValue,
} from "src/context/StateContext";

const Button: React.SFC<{}> = () => {
  console.log("button");
  const dispatch = useDispatch();
  const addItem = () => {
    dispatch({ type: "loadingOn" });
    setTimeout(() => {
      dispatch({ type: "addItem", item: { wineId: "new" } });
      dispatch({ type: "loadingOff" });
    }, 1000);
  };
  return (
    <div>
      <button onClick={addItem}>add</button>
      <button onClick={() => dispatch({ type: "reset" })}>reset</button>
      <button onClick={() => dispatch({ type: "loadingOn" })}>Start</button>
      <button onClick={() => dispatch({ type: "loadingOff" })}>Stop</button>
    </div>
  );
};

const Loader: React.SFC<{}> = () => {
  console.log("loading");
  const { loading } = useUIValue();
  return <div>{loading ? "loading" : "idle"}</div>;
};

const Items: React.SFC<{}> = () => {
  console.log("items");
  const { wines } = useInquiryValue();
  return (
    <div>
      {wines.map((x, i) => (
        <div key={i}>{x.wineId}</div>
      ))}
    </div>
  );
};

const IndexPage: React.SFC<{}> = props => {
  return (
    <div>
      <Loader />
      <Button />
      <Items />
    </div>
  );
};

export default IndexPage;
