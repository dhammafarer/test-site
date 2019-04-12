import React, { useReducer, useRef, useEffect, useState } from "react";
import { Box } from "primithemes";
import { useLockBodyScroll } from "src/hooks/useLockBodyScroll";
import { debounce } from "lodash";
import Faker from "faker";

const Menu: React.SFC<{}> = () => {
  useLockBodyScroll();
  return <div>Menu</div>;
};

interface Initial {
  position: "fixed" | "static";
  top: string | number;
  left: string | number;
  transform: string;
}

interface Action {
  type: "hide" | "show";
}

const initial: Initial = {
  position: "fixed",
  top: 0,
  left: 0,
  transform: "translateY(0)",
};

const reducer = (state: Initial, action: Action) => {
  switch (action.type) {
    case "show":
      return { ...state, transform: "translateY(0)" };
    case "hide":
      return { ...state, transform: "translateY(-100%)" };
    default:
      return state;
  }
};

const useHidingMenu = () => {
  const last = useRef(0);
  const dir = useRef(0);
  const [style, dispatch] = useReducer(reducer, initial);

  const handler = debounce(
    (e: any) => {
      const curr = window.scrollY;
      const currDir = window.scrollY - last.current > 0 ? 1 : -1;
      if (currDir !== dir.current) {
        currDir > 0 ? dispatch({ type: "hide" }) : dispatch({ type: "show" });
        dir.current = currDir;
      }
      last.current = curr;
    },
    300,
    { leading: true, trailing: true }
  );

  useEffect(() => {
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return { style };
};

const txt = Faker.lorem.paragraphs();

const IndexPage: React.SFC<{}> = props => {
  const [show, set] = useState(false);
  const { style } = useHidingMenu();
  return (
    <div>
      <Box
        w={1}
        p={3}
        bg="grey.300"
        style={{
          ...style,
          transition: "200ms ease-out",
        }}
      >
        <button onClick={() => set(!show)}>toggle</button>
      </Box>
      <Box w={1}>
        <Box bg="primary.light" p={4} w={1} style={{ height: "100vh" }}>
          {txt}
        </Box>
        <Box bg="primary.main" w={1} style={{ height: "100vh" }}>
          content
        </Box>
      </Box>
      {show && (
        <Box
          style={{
            height: "100vh",
            position: "fixed",
            zIndex: 5,
            top: 0,
            right: 0,
            width: "300px",
          }}
          bg="text.main"
        >
          <Menu />
        </Box>
      )}
    </div>
  );
};

export default IndexPage;
