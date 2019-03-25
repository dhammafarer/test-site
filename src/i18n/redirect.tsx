import * as React from "react";
import { navigate } from "gatsby";
import { languages, Language } from "./locales";

interface RedirectProps {
  location: any;
}

class Redirect extends React.PureComponent<RedirectProps, {}> {
  componentDidMount() {
    if (typeof window !== "undefined") {
      const { pathname } = this.props.location;
      const detected = guardLanguage(
        languages,
        localStorage.getItem("language") || navigator.language.split(/[-_]/)[0]
      );

      const newUrl = `/${detected}${pathname}`;
      window.localStorage.setItem("language", detected);
      navigate(newUrl);
    }
  }

  render() {
    return <div />;
  }
}

export default Redirect;

function guardLanguage(xs: Language[], y: string) {
  return xs.map(x => x.code).indexOf(y) > -1 ? y : "en";
}
