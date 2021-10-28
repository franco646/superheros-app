import React from "react";

import PropTypes from "prop-types";

import { connect } from "react-redux";

import { loginUser } from "../../redux/auth/auth.actions";

import { superHeroesLight } from "../../assets";

import * as yup from "yup";
import { Formik } from "formik";

import FloatingInput from "../../components/floating-input/floating-input";
import Checkbox from "../../components/checkbox/checkbox";
import Button from "../../components/button/button";
import Alert from "../../components/alert/alert";
import Spinner from "../../components/spinner/spinner";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingrese un email valido")
    .required("Ingrese su email"),
  password: yup.string().required("Ingrese su contraseña"),
});

const Login = ({ login, user }) => {
  const handleSubmit = (user) => {
    login(user);
  };

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5 vh-100 d-flex">
      <div className="row align-items-center g-lg-5 py-5 align-middle">
        <div className="col-lg-7 text-center text-lg-start">
          <img className="img-fluid" src={superHeroesLight} alt="logo" />
          <p className="text-muted text-center">
            Challenge de{" "}
            <a href="https://www.alkemy.org/" className="link-danger">
              Alkemy
            </a>
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            validateOnBlur
            initialValues={{
              email: "",
              password: "",
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
            }) => (
              <form
                className="p-4 p-md-5 border rounded-3 bg-light"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <FloatingInput
                  type="email"
                  label="Dirección de email"
                  id="login__email-input"
                  data-testid="email-input"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email ? errors.email : null}
                />
                <FloatingInput
                  type="password"
                  label="Contraseña"
                  data-testid="password-input"
                  id="login__password-input"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password ? errors.password : null}
                />
                <Checkbox label="Recuérdame" id="login__remember-check" />
                {user.errorMessage ? <Alert>{user.errorMessage}</Alert> : null}
                {user.isAuthenticating ? (
                  <Spinner className="text-primary" />
                ) : (
                  <Button
                    className="w-100 btn-lg btn-primary"
                    type="submit"
                    data-testid="login-button"
                  >
                    Iniciar sesión
                  </Button>
                )}
                <hr className="my-4" />
                <small className="text-muted">
                  Al hacer click en iniciar sesión, acepta los términos de uso.
                </small>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func,
  user: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(loginUser(email, password)),
});

const mapStateToProps = (state) => ({
  user: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
