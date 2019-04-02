import * as React from "react";
type Validator = (value: string) => string;

type Fields<T> = {
  [P in keyof T]: {
    value: string;
    validators: Validator[];
  }
};

type Values<T> = { [P in keyof T]: string };
type Errors<T> = { [P in keyof T]: React.ReactNode[] };

interface Messages {
  [key: string]: React.ReactNode;
}

export const useFormValidation = <T>(fields: Fields<T>, messages: Messages) => {
  const getInitialValues = () =>
    Object.keys(fields).reduce(
      (a, b) => ({ ...a, [b]: fields[b].value }),
      {} as Values<T>
    );
  const getInitialErrors = () =>
    Object.keys(fields).reduce((a, b) => ({ ...a, [b]: [] }), {} as Errors<T>);

  const [values, setValues] = React.useState(getInitialValues());

  const [errors, setErrors] = React.useState(getInitialErrors());

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
        if (errs.length < 1) return { valid: true, errs: a.errs };
        return { valid: false, errs: Object.assign({}, a.errs, { [b]: errs }) };
      },
      { valid: false, errs: {} } as { valid: boolean; errs: Errors<T> }
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { valid, errs } = validateForm();
    if (!valid) {
      e.preventDefault();
      setErrors(errs);
    }
  };

  const reset = () => {
    setValues(getInitialValues());
    setErrors(getInitialErrors());
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleBlur,
    handleSubmit,
    reset,
    updateValue,
  };
};
