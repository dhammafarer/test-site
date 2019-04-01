import React, { createContext, useContext, useReducer } from "react";

interface Action {
  type: "fetchState" | "addItem" | "reset";
  item?: string;
}

type Context = [State, (a: Action) => void];

interface State {
  wines: string[];
}

const initialState: State = { wines: [] };

export const StateContext = createContext<Context>([initialState, () => {}]);

const reducer = (state: State, action: any) => {
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

export const StateProvider: React.SFC<{}> = ({ children }) => {
  const value = useReducer(reducer, initialState);
  React.useEffect(() => {
    value[1]({ type: "fetchState" });
  }, []);

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
