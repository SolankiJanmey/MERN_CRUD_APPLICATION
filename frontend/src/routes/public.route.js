import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthStore } from "store/useAuth";

const PublicRoute = ({ component, ...rest }) => {
  const { isLoggedIn } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));
  const Component = component;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PublicRoute;
