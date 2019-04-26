import * as React from "react";
import { Spring, MultiStageTransitions } from "src/components/Spring";

const TouchPage: React.SFC<{}> = props => {
  return (
    <div>
      <Spring />
      <MultiStageTransitions />
    </div>
  );
};

export default TouchPage;
