import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import { loginUserSuccess } from "./redux/auth/auth.actions";

import Navbar from "./components/navbar/navbar";

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Edit from "./pages/edit/edit";
import Hero from "./pages/hero/hero";

import "./App.css";
import Spinner from "./components/spinner/spinner";

function App({ user, loginUserSuccess }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      loginUserSuccess(token);
    }
    setIsLoading(false);
  }, [loginUserSuccess]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {user.isAuthenticated ? <Navbar /> : null}
      <Routes>
        <Route path="/" exact>
          <Navigate to="/home" />
        </Route>
        <Route path="/home">
          {!user.isAuthenticated ? <Navigate to="/login" /> : <Home />}
        </Route>
        <Route path="/edit/:teamId?">
          {!user.isAuthenticated ? <Navigate to="/login" /> : <Edit />}
        </Route>
        <Route path="/hero/:heroId">
          {!user.isAuthenticated ? <Navigate to="/login" /> : <Hero />}
        </Route>
        <Route path="/login">
          {user.isAuthenticated ? <Navigate to="/home" /> : <Login />}
        </Route>
      </Routes>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth,
  redirectTo: state.redirect.redirectTo,
});

const mapDispatchToProps = (dispatch) => ({
  loginUserSuccess: (token) => dispatch(loginUserSuccess(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
