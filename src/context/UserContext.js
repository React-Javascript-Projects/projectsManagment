import React, { createContext, useReducer } from "react";
import userReducer from "./userReducer";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [state, dispatch] = useReducer(userReducer, {});
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
