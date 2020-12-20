import "./App.css";
import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import Register from "./auth/components/Register.component";
import Details from "./user/components/Details.component";
import List from "./user/components/List.component";
import Login from "./auth/components/Login.component";

import Routes from "./Routes";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import RouteWithLayout from "./RouteWithLayout";
import MainLayout from "./MainLayout";

const theme = createMuiTheme({});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Routes />
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
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
    </ThemeProvider>
  );
};

export default App;
