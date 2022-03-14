import React, { createContext, useReducer } from "react";
// react bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// global scss
import "./global.scss";
// react router
import { Switch, Route } from "react-router-dom";
// components
import {
  Toolbar,
  Home,
  About,
  Contact,
  Login,
  Registration,
  Error,
  Logout,
} from "./components";
// reducer
import { initialState, reducer } from "./useReducer/UseReducer";

// create context
export const UserContext = createContext();

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/registration" component={Registration} />
      <Route exact path="/logout" component={Logout} />
      <Route component={Error} />
    </Switch>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Toolbar />
        <Routing />
      </UserContext.Provider>
    </>
  );
};

export default App;
