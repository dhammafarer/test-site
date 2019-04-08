import * as React from "react";

const List: React.SFC<{ items: number[] }> = React.memo(({ items }) => {
  console.log("render list");
  return (
    <div>
      {items.map((x, idx) => (
        <div key={idx}>{x}</div>
      ))}
    </div>
  );
});

const Table: React.SFC<{ title?: string }> = ({ title }) => {
  React.useEffect(() => {
    console.log("render table");
  });
  const [value, dispatch] = React.useReducer(c => c + 1, 0);
  const [items, setItems] = React.useReducer(
    x => [...x, x[x.length - 1] + 1],
    [1, 2, 3, 4],
    init => init.map(x => x * 2)
  );

  return (
    <div>
      <div>{title}</div>
      <div>value: {value}</div>
      <div>
        <button onClick={dispatch}>setCount</button>
        <button onClick={setItems}>setItems</button>
      </div>
      <List items={items} />
    </div>
  );
};

export { Table };
