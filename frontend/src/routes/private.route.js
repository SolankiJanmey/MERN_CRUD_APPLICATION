import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthStore } from "store/useAuth";

const PrivateRoute = ({ component, ...rest }) => {
  const { isLoggedIn } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));
  const Component = component;
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
