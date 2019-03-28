import * as React from "react";
import { Layout } from "src/components/Layout";
import { Multiselect } from "src/components/Multiselect";

interface Option {
  value: string;
  label: string;
}

const items: Option[] = [
  { value: "2", label: "two" },
  { value: "3", label: "three" },
  { value: "6", label: "six" },
  { value: "4", label: "four" },
  { value: "1", label: "one" },
  { value: "5", label: "five" },
];

const IndexPage: React.SFC<{}> = props => {
  const [selected, setSelected] = React.useState([]);
  return (
    <Layout>
      <Multiselect
        selected={selected}
        setSelected={setSelected}
        items={items}
      />
    </Layout>
  );
};

export default IndexPage;
