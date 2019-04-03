import React, { createContext, useContext, useReducer } from "react";

interface Action {
  type: "fetchState" | "addItem" | "reset" | "loadingOn" | "loadingOff";
  item?: string;
}

type StateContext = State;
type DispatchContext = (a: Action) => void;

type Inquiry = {
  wines: { wineId: string }[];
};

interface UI {
  loading: boolean;
}
interface State {
  inquiry: Inquiry;
  ui: UI;
}

const initialState: State = { ui: { loading: false }, inquiry: { wines: [] } };

export const StateContext = createContext<StateContext>(initialState);
export const DispatchContext = createContext<DispatchContext>(() => {});

const inquiryReducer = (state: Inquiry, action: Action) => {
  switch (action.type) {
    case "fetchState": {
      const ls = window.localStorage.getItem("inquiry");
      if (!ls) return state;
      try {
        const data = JSON.parse(ls);
        return data;
      } catch {
        return state;
      }
    }
    case "addItem": {
      const newState = { ...state, wines: [...state.wines, action.item] };
      window.localStorage.setItem("inquiry", JSON.stringify(newState));
      return newState;
    }
    case "reset": {
      const newState = { ...state, wines: [] };
      window.localStorage.setItem("inquiry", JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};

const uiReducer = (state: UI, action: Action) => {
  switch (action.type) {
    case "loadingOn": {
      return { ...state, loading: true };
    }
    case "loadingOff": {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

const mainReducer = ({ inquiry, ui }: State, action: Action) => {
  console.log("action: ", action);
  return {
    inquiry: inquiryReducer(inquiry, action),
    ui: uiReducer(ui, action),
  };
};

export const StateProvider: React.SFC<{}> = ({ children }) => {
  const [value, dispatch] = useReducer(mainReducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={value}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
export const useDispatch = () => useContext(DispatchContext);
