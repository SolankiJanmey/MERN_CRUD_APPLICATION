import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthUserService } from "services/userAuth";

const Login = () => {
  const { loginUser } = AuthUserService();

  const LoginFormInitialValues = {
    username: "",
    password: "",
  };

  const LoginFormValidate = Yup.object().shape({
    username: Yup.string().required("Username is required!"),
    password: Yup.string()
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}/,
        "Invalid password format!"
      )
      .required("Password is required!"),
  });

  const handleFormSubmit = async (values) => {
    try {
      loginUser(values);
    } catch (err) {
      console.log(err);
    }
  };

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: LoginFormInitialValues,
    enableReinitialize: true,
    validationSchema: LoginFormValidate,
    onSubmit: handleFormSubmit,
  });

  return (
    <div className="col-md-6 offset-md-3 mt-5">
      <div className="card">
        <h4 className="card-header">Login</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                name="username"
                type="text"
                onChange={handleChange}
                value={values.username}
                className={`form-control ${errors.username ? "is-invalid" : ""
                  }`}
              />
              <div className="invalid-feedback">{errors.username}</div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                className={`form-control ${errors.password ? "is-invalid" : ""
                  }`}
              />
              <div className="invalid-feedback">{errors.password}</div>
            </div>

            <div>
              <input
                name="remember"
                type="checkbox"
                defaultChecked
                placeholder="Filter For Rating greater than entered value."
                onChange={(e) => { }}
                className={`ml-3 mr-3 mt-1`}
              /><label>Remember me</label>
            </div>
            <button type="submit" className="btn btn-primary">
              {false && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Login
            </button>
            <Link to="/signup" className="btn btn-link">
              Register
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
