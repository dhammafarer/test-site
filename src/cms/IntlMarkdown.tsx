import * as React from "react";
import { languages } from "../i18n/locales";
import CMS from "netlify-cms";
import { Wrapper, Label } from "./styles";
import { Box } from "primithemes";

interface Props {
  value: string;
  onChange: any;
}

const IntlMarkdown: React.SFC<Props> = ({ value, onChange, ...props }) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(value ? value : "", "text/html");

  const getInner = (lang: string) => {
    const enTag = doc.getElementsByClassName(lang)[0];
    return enTag ? enTag.innerHTML : "";
  };

  const handleChange = (lang: string, e: any) => {
    const enTag = doc.getElementsByClassName(lang)[0];
    if (enTag) {
      enTag.innerHTML = e;
    } else {
      const el = document.createElement("div");
      el.className = lang;
      el.innerHTML = e;
      doc.body.appendChild(el);
    }
    onChange(doc.body.innerHTML);
  };
  const MarkdownControl = CMS.getWidget("markdown").control;

  return (
    <Wrapper>
      {languages.map(l => (
        <Box key={l.code} my={3}>
          <Label>{l.name}</Label>
          <MarkdownControl
            {...props}
            value={getInner(l.code)}
            onChange={(e: any) => handleChange(l.code, e)}
          />
        </Box>
      ))}
    </Wrapper>
  );
};

export { IntlMarkdown };
