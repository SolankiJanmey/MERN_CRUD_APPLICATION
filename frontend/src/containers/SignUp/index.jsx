import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthUserService } from "services/userAuth";

const SignUp = () => {
  const { registerUser } = AuthUserService();

  const RegisterFormInitialValues = {
    username: "",
    password: "",
  };

  const RegisterFormValidate = Yup.object().shape({
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
      registerUser(values);
    } catch (err) {
      console.log(err);
    }
  };

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: RegisterFormInitialValues,
    enableReinitialize: true,
    validationSchema: RegisterFormValidate,
    onSubmit: handleFormSubmit,
  });

  return (
    <div className="col-md-6 offset-md-3 mt-5">
      <div className="card">
        <h4 className="card-header">Register</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                name="username"
                type="text"
                onChange={handleChange}
                value={values.username}
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
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
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password}</div>
            </div>
            <button type="submit" className="btn btn-primary">
              {false && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
                //                 <div class="d-flex justify-content-center">
                //   <div class="spinner-border" role="status">
                //     <span class="sr-only">Loading...</span>
                //   </div>
                // </div>
              )}
              Register
            </button>
            <Link to="/login" className="btn btn-link">
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
