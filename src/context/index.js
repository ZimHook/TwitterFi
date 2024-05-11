import { createContext, useReducer, useContext } from "react";
import { userinfoState, userinfoReducer } from "./userinfo";

const initialState = {
  userinfo: userinfoState,
};

const combineReducers = (reducerObj) => {
  return (state, action) => {
    return Object.keys(reducerObj).reduce(
      (acc, prop) => ({
        ...acc,
        [prop]: reducerObj[prop](acc[prop], action),
      }),
      state
    );
  };
};

const rootReducer = combineReducers({
  userinfo: userinfoReducer,
});

const StateContext = createContext();
const DispatchContent = createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContent.Provider value={dispatch}>
        {children}
      </DispatchContent.Provider>
    </StateContext.Provider>
  );
};

// state hook
export const useStateStore = () => {
  return useContext(StateContext);
};

// dispatch hook
export const useDispatchStore = () => {
  return useContext(DispatchContent);
};
