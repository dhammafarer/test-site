//const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

export const isRequired = (value: string) => {
  const message = ` is required.`;
  return value.trim().length < 1 ? message : "";
};

export const isAdult = (value: string) => {
  const message = ` is invalid.`;
  const age = 18;
  const current = new Date().valueOf();
  const dob = new Date(value);
  const adult = new Date(
    dob.getFullYear() + age,
    dob.getMonth(),
    dob.getDay()
  ).valueOf();
  return adult > current ? message : "";
};
