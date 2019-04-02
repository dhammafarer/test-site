import * as React from "react";
import { Button, Box, Card } from "primithemes";
import { Input } from "./Input";
import { isRequired, isAdult } from "./validations";

type Validator = (value: string) => string;

type Values = { [key: string]: string };
type Errors = { [key: string]: React.ReactNode[] };

interface Fields {
  [key: string]: {
    value: string;
    validators: Validator[];
  };
}

interface Messages {
  [key: string]: React.ReactNode;
}

const useFormValidation = (fields: Fields, messages: Messages) => {
  const [values, setValues] = React.useState(
    Object.keys(fields).reduce(
      (a, b) => ({ ...a, [b]: fields[b].value }),
      {} as Values
    )
  );
  const initialErrors = Object.keys(fields).reduce(
    (a, b) => ({ ...a, [b]: [] }),
    {} as Errors
  );

  const [errors, setErrors] = React.useState(initialErrors);

  const updateValue = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    const newState = Object.assign({}, values, {
      [name]: value,
    });
    setValues(newState);
  };

  const updateErrorsFor = (name: string, errs: React.ReactNode[]) => {
    setErrors({ ...errors, [name]: errs });
  };

  const validate = (value: string, name: string) => {
    const valFns = fields[name].validators as Validator[];
    if (!valFns) return [];
    const errs = valFns.reduce(
      (a, b) => {
        const err = b(value);
        if (err) a.push(messages[err]);
        return a;
      },
      [] as React.ReactNode[]
    );
    return errs;
  };

  const handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    updateErrorsFor(name, validate(value, name));
  };

  const validateForm = () => {
    return Object.keys(fields).reduce(
      (a, b) => {
        const errs = validate(values[b], b);
        if (errs.length < 1) return [true, a[1]];
        return [false, Object.assign({}, a[1], { [b]: errs })];
      },
      [false, {}]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const [valid, errs] = validateForm();
    if (!valid) {
      e.preventDefault();
      console.log(errs);
      setErrors(errs);
    }
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleBlur,
    handleSubmit,
    updateValue,
  };
};

const Form: React.SFC<{}> = props => {
  const fields = {
    name: {
      value: "",
      validators: [isRequired],
    },
    birthdate: {
      value: "",
      validators: [isRequired, isAdult],
    },
  };
  const messages = {
    isRequired: <span> is required.</span>,
    isAdult: <span> is invalid.</span>,
  };

  const {
    values,
    errors,
    handleBlur,
    handleSubmit,
    updateValue,
  } = useFormValidation(fields, messages);

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
              handleBlur={handleBlur}
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
              handleBlur={handleBlur}
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
