import CMS from "netlify-cms";
import { IntlString } from "./IntlString";
import { IntlMarkdown } from "./IntlMarkdown";
import { IntlTextarea } from "./IntlTextarea";

CMS.registerWidget(`intl-string`, IntlString);
CMS.registerWidget(`intl-textarea`, IntlTextarea);
CMS.registerWidget(`intl-markdown`, IntlMarkdown);
