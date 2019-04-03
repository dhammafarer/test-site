import React, { createContext, useContext, useReducer } from "react";
import { remove, set, over, lensProp, append } from "ramda";
import shuffle from "lodash.shuffle";

const winesLens = lensProp("wines");
const loadingLens = lensProp("loading");

type Action =
  | { type: "fetchState" }
  | { type: "addItem"; item: { wineId: string } }
  | { type: "removeItem"; idx: number }
  | { type: "reset" }
  | { type: "loadingOn" }
  | { type: "loadingOff" }
  | { type: "shuffleItems" };

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

export const InquiryContext = createContext<Inquiry>(initialState.inquiry);
export const UIContext = createContext<UI>(initialState.ui);
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
      return over(winesLens, append(action.item), state);
    }
    case "removeItem": {
      return over(winesLens, remove(action.idx, 1), state);
    }
    case "reset": {
      return set(winesLens, [], state);
    }
    case "shuffleItems": {
      return over(winesLens, shuffle, state);
    }
    default:
      return state;
  }
};

const uiReducer = (state: UI, action: Action) => {
  switch (action.type) {
    case "loadingOn": {
      return set(loadingLens, true, state);
    }
    case "loadingOff": {
      return set(loadingLens, false, state);
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

const InquiryValueProvider: React.SFC<{ value: Inquiry }> = ({
  value,
  children,
}) => (
  <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>
);

const UIValueProvider: React.SFC<{ value: UI }> = ({ value, children }) => (
  <UIContext.Provider value={value}>{children}</UIContext.Provider>
);

export const StateProvider: React.SFC<{}> = ({ children }) => {
  const [value, dispatch] = useReducer(mainReducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <UIValueProvider value={value.ui}>
        <InquiryValueProvider value={value.inquiry}>
          {children}
        </InquiryValueProvider>
      </UIValueProvider>
    </DispatchContext.Provider>
  );
};

export const useInquiryValue = () => useContext(InquiryContext);
export const useUIValue = () => useContext(UIContext);
export const useDispatch = () => useContext(DispatchContext);
