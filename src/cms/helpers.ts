import { Language } from "../i18n/locales";

export const parseValue = (langs: Language[], value?: string) => {
  const init = langs.reduce((a, b) => {
    a[b.code] = "";
    return a;
  }, {});

  try {
    const json = JSON.parse(value || "");
    return Object.assign({}, init, json);
  } catch {
    return init;
  }
};
