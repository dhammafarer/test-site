import * as React from "react";
import { Layout } from "src/components/Layout";
import { Multiselect } from "src/components/Multiselect";

const IndexPage: React.SFC<{}> = props => {
  return (
    <Layout>
      <Multiselect
        items={[
          { value: "1", label: "one" },
          { value: "2", label: "two" },
          { value: "3", label: "three" },
        ]}
      />
    </Layout>
  );
};

export default IndexPage;
