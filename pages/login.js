import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../src/context/UserContext";

const Login = () => {
  const { signInGoogle, user, signInGoogleWithRedirect } =
    useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const validateForm = (_formValues) => {
    const errors = {};
    if (!_formValues.email) {
      errors.email = "email is required";
    }
    if (!_formValues.password) {
      errors.password = "password is required";
    }
    return errors;
  };
  // create a function which set the values of form field
  const handleOnChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e, obj) => {
    e.preventDefault();
    let _errors = validateForm(formValues);
    setFormErrors(_errors);
    if (Object.keys(_errors).length === 0) {
      console.log("NOOOOO ERRORS");
      createJobPost();
    }
  };
  console.log({ user });
  return (
    <div className="mt-16 p-4 ">
      <h1 className="text-center">Login</h1>
      <div className="flex flex-col items-center justify-center space-y-4">
        <button className="button" onClick={signInGoogleWithRedirect}>
          GOOGLE LOGIN
        </button>
        <div>OR</div>
        {user?.email}
      </div>
      <form className="mt-8 w-full p-4 md:w-1/2 mx-auto">
        {formErrors.email && <span className="error">{formErrors.email}</span>}
        <label>
          EMAIL*
          <input
            required
            type="text"
            name={Object.keys(formValues)[0]}
            value={formValues.email}
            onChange={handleOnChange}
          ></input>
        </label>

        {formErrors.password && (
          <span className="error">{formErrors.password}</span>
        )}
        <label>
          PASSWORD*
          <input
            name={Object.keys(formValues)[1]}
            type="password"
            value={formValues.password}
            onChange={handleOnChange}
          ></input>
        </label>
        {loading ? (
          <div className="loader"></div>
        ) : (
          <button
            className="button"
            onClick={(e) => handleSubmit(e, formValues)}
          >
            Login
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
