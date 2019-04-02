//const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

export const isRequired = (value: string) => {
  const message = ` is required.`;
  return value.trim().length < 1 ? message : "";
};
