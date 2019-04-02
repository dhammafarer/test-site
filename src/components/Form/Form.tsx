import * as React from "react";
import { Button, Box, Card } from "primithemes";
import { Input } from "./Input";
import { isRequired, isAdult } from "./validations";

type Validator = (value: string) => string[];

const Form: React.SFC<{}> = props => {
  const [values, setValues] = React.useState({
    name: "",
    birthdate: "",
  });
  const validators = { name: [isRequired], birthdate: [isRequired, isAdult] };

  const [errors, setErrors] = React.useState({ name: [], birthdate: [] });

  const updateValue = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    const newState = Object.assign({}, values, {
      [name]: value,
    });
    setValues(newState);
  };

  const validate = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    const valFns = validators[name];
    if (!valFns) return;
    const errs = valFns
      .map((x: Validator) => x(value))
      .filter((x: string) => x !== "");
    setErrors(Object.assign({}, { ...errors, [name]: errs }));
  };

  const validateAll = () => {
    const errs = Object.keys(validators).reduce(
      (a, b) => {
        a[b] = validators[b].map(x => x(values[b])).filter(x => x !== "");
        return a;
      },
      { name: [], birthdate: [] }
    );
    setErrors(errs);
    return Object.keys(errs).find(k => errs[k].length > 0) ? false : true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateAll()) e.currentTarget.submit();
  };

  return (
    <Box p={3}>
      <Card shadow={1} radius={2} p={3} bg="grey.100">
        <form onSubmit={handleSubmit}>
          <Box>
            <Input
              name="name"
              type="text"
              title="Name"
              required
              errors={errors.name}
              value={values.name}
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
              value={values.birthdate}
              handleChange={updateValue}
              errors={errors.birthdate}
              handleBlur={validate}
            />
          </Box>
          <Box mt={3}>
            <Button radius={2} p={2} type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export { Form };
