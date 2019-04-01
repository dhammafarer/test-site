import * as React from "react";
import { Layout } from "src/components/Layout";
import { Multiselect } from "src/components/Multiselect";

interface Option {
  value: string;
  label: string;
}

const items: Option[] = [
  { value: "1", label: "one" },
  { value: "2", label: "two" },
  { value: "3", label: "three" },
  { value: "4", label: "four" },
  { value: "5", label: "five" },
  { value: "6", label: "six" },
];

const IndexPage: React.SFC<{}> = props => {
  const [selected, setSelected] = React.useState([]);
  return (
    <Layout>
      <Multiselect
        selected={selected}
        setSelected={setSelected}
        maxHeight="150px"
        items={items}
      />
      <form name="contact" data-netllify="true" method="POST">
        <input type="hidden" name="form-name" value="contact" />
        <fieldset>
          <label>name</label>
          <input type="text" name="name" />
        </fieldset>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </Layout>
  );
};

export default IndexPage;
