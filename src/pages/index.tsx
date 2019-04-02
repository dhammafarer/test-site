import * as React from "react";
import { Box, Card } from "primithemes";
import { Input } from "src/components/Form";

type Validator = (name: string, value: string) => string[];

const IndexPage: React.SFC<{}> = props => {
  const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);
  const isRequired = (name: string, value: string) => {
    const message = `${capitalize(name)} is required.`;
    return value.trim().length < 1 ? message : "";
  };
  const [personal, setPersonal] = React.useState({
    name: "",
    birthdate: "",
  });
  const validators = { name: [isRequired], birthdate: [isRequired] };

  const [errors, setErrors] = React.useState({ name: [], birthdate: [] });

  const updateValue = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    const newState = Object.assign({}, personal, {
      [name]: value,
    });
    setPersonal(newState);
  };

  const validate = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    const valFns = validators[name];
    if (!valFns) return;
    const errs = valFns
      .map((x: Validator) => x(name, value))
      .filter((x: string) => x !== "");
    setErrors(Object.assign({}, { ...errors, [name]: errs }));
    console.log(errors);
  };

  return (
    <Box p={3}>
      <Card shadow={1} radius={2} p={3} bg="grey.100">
        <Box>
          <Input
            name="name"
            type="text"
            title="Name"
            required
            errors={errors.name}
            value={personal.name}
            handleChange={updateValue}
            handleBlur={validate}
          />
        </Box>
        <Box>
          <Input
            name="birthdate"
            type="date"
            required
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
