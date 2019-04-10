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
}

interface Action {
  type: "hide" | "show";
}

const initial: Initial = { position: "fixed", top: "0px", left: 0 };

const reducer = (state: Initial, action: Action) => {
  switch (action.type) {
    case "show":
      return { ...state, top: "0px" };
    case "hide":
      return { ...state, top: "-50px" };
    default:
      return state;
  }
};

const useHidingMenu = () => {
  const last = useRef(0);
  const dir = useRef(0);
  const [style, dispatch] = useReducer(reducer, initial);
  const ref = useRef();
  console.log(ref);

  const handler = debounce(
    (e: any) => {
      const curr = window.scrollY;
      const currDir = window.scrollY - last.current > 0 ? 1 : -1;
      if (currDir !== dir.current) {
        currDir > 0 ? dispatch({ type: "hide" }) : dispatch({ type: "show" });
        dir.current = currDir;
      }
      last.current = curr;
      console.log(last.current);
    },
    500,
    { leading: true, trailing: true }
  );

  useEffect(() => {
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    console.log(style);
  }, [style]);

  return [{ ref }, style] as [any, typeof style];
};

const IndexPage: React.SFC<{}> = props => {
  const [show, set] = useState(false);
  const [bind, style] = useHidingMenu();
  return (
    <div>
      <div {...bind}>
        <Box
          w={1}
          bg="white.light"
          style={{
            ...style,
            transition: "400ms ease-out",
          }}
        >
          <button onClick={() => set(!show)}>toggle</button>
          {show && <Menu />}
        </Box>
      </div>
      <Box bg="primary.light" style={{ height: "100vh" }} />
      <Box bg="primary.main" style={{ height: "100vh" }} />
    </div>
  );
};

export default IndexPage;
