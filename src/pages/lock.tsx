import React, { useState } from "react";
import { Box } from "primithemes";
import { useLockBodyScroll } from "src/hooks/useLockBodyScroll";

const Menu: React.SFC<{}> = () => {
  useLockBodyScroll();
  return <div>Menu</div>;
};

const IndexPage: React.SFC<{}> = props => {
  const [show, set] = useState(false);
  return (
    <div>
      <div style={{ position: "fixed" }}>
        <button onClick={() => set(!show)}>toggle</button>
        {show && <Menu />}
      </div>
      <Box bg="primary.light" style={{ height: "100vh" }} />
      <Box bg="primary.main" style={{ height: "100vh" }} />
    </div>
  );
};

export default IndexPage;
