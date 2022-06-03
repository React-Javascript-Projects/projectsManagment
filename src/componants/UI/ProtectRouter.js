import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const ProtectRouter = ({ component: Component, ...rest }) => {
  const { state } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return state.id ? <Component {...props} /> : <Redirect to={"/login"} />;
      }}
    />
  );
};

export default ProtectRouter;
