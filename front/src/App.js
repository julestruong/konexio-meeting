import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import Register from "./components/auth/Register.component";
import Details from "./components/user/Details.component";
import List from "./components/user/List.component";
import Login from "./components/auth/Login.component";

import Routes from "./routes/Routes";
import RouteWithLayout from "./routes/RouteWithLayout";
import MainLayout from "./layouts/MainLayout";

const App = () => {
  return (
    <Router>
      <div>
        <Routes />
        <Switch>
          <RouteWithLayout
            exact
            path="/register"
            component={Register}
            title="Register"
            layout={MainLayout}
          />
          <RouteWithLayout
            exact
            path="/"
            component={List}
            title="List"
            layout={MainLayout}
          />
          <RouteWithLayout
            exact
            path="/login"
            component={Login}
            title="Login"
            layout={MainLayout}
          />
          <RouteWithLayout
            exact
            path="/users/:id"
            component={Details}
            title="Details"
            layout={MainLayout}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
