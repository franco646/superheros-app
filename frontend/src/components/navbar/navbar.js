import React from "react";

import { Link } from "react-router-dom";

import { superHeroesLight } from "../../assets";

import { BsBoxArrowInRight } from "react-icons/bs";

import Button from "../button/button";

import { connect } from "react-redux";

import { logoutUser } from "../../redux/auth/auth.actions";

const Navbar = ({ logout }) => (
  <nav className="navbar navbar-expand navbar-dark bg-gray-6">
    <div className="container-fluid">
      <Link to="/">
        <img
          src={superHeroesLight}
          alt="Super heroes app"
          width="180"
          height="30"
          className="d-inline-block align-text-top"
        />
      </Link>
      <div className="d-flex">
        <Button
          className="btn-outline-danger"
          onClick={logout}
          data-testid="logout-button"
        >
          Cerrar sesión <BsBoxArrowInRight />
        </Button>
      </div>
    </div>
  </nav>
);

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutUser()),
});

export default connect(null, mapDispatchToProps)(Navbar);
