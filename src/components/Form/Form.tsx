import * as React from "react";
import { Button, Box, Card } from "primithemes";
import { Input } from "./Input";
import { isRequired, isAdult } from "./validations";
import { useFormValidation } from "./useFormValidation";

const Form: React.SFC<{}> = props => {
  const fields = {
    name: {
      value: "",
      validators: [isRequired],
    },
    address: {
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
              name="address"
              type="text"
              title="Address"
              required
              errors={errors.address}
              value={values.address}
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
