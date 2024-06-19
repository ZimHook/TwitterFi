export const userinfoState = {
};

export const userinfoReducer = (state, action) => {
  switch (action.type) {
    case "setUserinfo":
      return { ...action.userinfo };
    case "logout":
      return { connected: false };
  }
  return state;
};
