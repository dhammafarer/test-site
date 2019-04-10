import React, {
  MouseEvent,
  useReducer,
  useRef,
  useEffect,
  useState,
} from "react";
import { Box } from "primithemes";
import { useLockBodyScroll } from "src/hooks/useLockBodyScroll";
import { debounce } from "lodash";

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
    500,
    { leading: true, trailing: true }
  );

  useEffect(() => {
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return { style };
};

const IndexPage: React.SFC<{}> = props => {
  const [show, set] = useState(false);
  const { style } = useHidingMenu();
  return (
    <div>
      <Box
        w={1}
        p={3}
        bg="white.light"
        style={{
          ...style,
          transition: "200ms ease-out",
        }}
      >
        <button onClick={() => set(!show)}>toggle</button>
        {show && <Menu />}
      </Box>
      <Box bg="primary.light" style={{ height: "100vh" }} />
      <Box bg="primary.main" style={{ height: "100vh" }} />
    </div>
  );
};

export default IndexPage;
