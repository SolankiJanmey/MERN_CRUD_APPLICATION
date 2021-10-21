import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "containers/Login";
import SignUp from "containers/SignUp";
import PrivateRoute from "./private.route";
import PublicRoute from "./public.route";
import Dashboard from "containers/Dashboard";
import AddBook from "containers/AddBook";
import Editbook from "containers/EditBook";
import Viewbook from "containers/ViewBook";

function Routes() {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/signup" component={SignUp} />
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute exact path="/addbook" component={AddBook} />
        <PrivateRoute exact path="/editbook/:book_id" component={Editbook} />
        <PrivateRoute exact path="/viewbook/:book_id" component={Viewbook} />
      </Switch>
    </Router>
  );
}

export default Routes;
