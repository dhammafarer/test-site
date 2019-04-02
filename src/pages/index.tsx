import * as React from "react";
import { Box, Card } from "primithemes";
import { Input } from "src/components/Form";

const IndexPage: React.SFC<{}> = props => {
  const [personal, setPersonal] = React.useState({
    name: "",
    birthdate: "",
  });

  const updateValue = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    const newState = Object.assign({}, personal, {
      [name]: value,
    });
    console.log(newState);
    setPersonal(newState);
  };
  return (
    <Box p={3}>
      <Card shadow={1} radius={2} p={3} bg="grey.100">
        <Box>
          <Input
            name="name"
            type="text"
            title="Name"
            value={personal.name}
            handleChange={updateValue}
          />
        </Box>
        <Box>
          <Input
            name="birthdate"
            type="date"
            title="Date"
            value={personal.birthdate}
            handleChange={updateValue}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default IndexPage;
