import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import { loginUserSuccess } from "./redux/auth/auth.actions";

import Navbar from "./components/navbar/navbar";

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Edit from "./pages/edit/edit";
import Hero from "./pages/hero/hero";

import "./App.css";
import Spinner from "./components/spinner/spinner";

function App({ user, loginUserSuccess }) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      loginUserSuccess(token);
    }
  }, [loginUserSuccess]);

  return user.isAuthenticating ? (
    <Spinner />
  ) : (
    <>
      {user.isAuthenticated ? <Navbar /> : null}
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          {!user.isAuthenticated ? <Redirect to="/login" /> : <Home />}
        </Route>
        <Route path="/edit/:teamId?">
          {!user.isAuthenticated ? <Redirect to="/login" /> : <Edit />}
        </Route>
        <Route path="/hero/:heroId">
          {!user.isAuthenticated ? <Redirect to="/login" /> : <Hero />}
        </Route>
        <Route path="/login">
          {user.isAuthenticated ? <Redirect to="/home" /> : <Login />}
        </Route>
      </Switch>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  loginUserSuccess: (token) => dispatch(loginUserSuccess(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
