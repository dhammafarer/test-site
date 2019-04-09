import * as React from "react";
import { Box } from "primithemes";
import { Form } from "src/components/Form";
import { ClickOutside } from "src/components/ClickOutside";

const IndexPage: React.SFC<{}> = props => {
  return (
    <Box p={3}>
      <ClickOutside onClick={() => console.log("click")}>
        <Form />
      </ClickOutside>
    </Box>
  );
};

export default IndexPage;
