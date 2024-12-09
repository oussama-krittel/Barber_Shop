import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ toggleView }) => {

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleLoginForm = (evt) => {
    evt.preventDefault();
    setErrors((errors) => ({ ...validateCredentials(credentials) }));
  };

  const validateCredentials = (credentials) => {
    let errors = {};

    if (credentials.username === "") {
      errors = Object.assign(errors, {
        username: "This field is required",
      });
    }

    if (credentials.password === "") {
      errors = Object.assign(errors, {
        password: "This field is required",
      });
    }

    return errors;
  };

  const handleInputChange = (evt) => {
    evt.persist();
    setCredentials((credentials) => ({
      ...credentials,
      [evt.target.name]: evt.target.value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <form
        className="flex flex-col items-center w-2/5 bg-white p-8 shadow-sm rounded"
        onSubmit={handleLoginForm.bind(this)}
      >
        <section className="w-full mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Email
          </label>
          <input
            id="username"
            className={
              "border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary " +
              (errors.hasOwnProperty("username") ? "border-red-500" : "")
            }
            name="username"
            type="text"
            placeholder="e.g. some.example"
            value={credentials.username}
            onChange={handleInputChange.bind(this)}
          />
          {errors.hasOwnProperty("username") && (
            <p className="text-red-500 text-xs italic">{errors.username}</p>
          )}
        </section>
        <section className="w-full mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            className={
              "border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary " +
              (errors.hasOwnProperty("password") ? "border-red-500" : "")
            }
            name="password"
            type="password"
            placeholder="* * * * * * * *"
            value={credentials.password}
            onChange={handleInputChange.bind(this)}
          />
          {errors.hasOwnProperty("password") && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </section>
        <Link
          to={"/"}
          className="w-full bg-indigo-700 hover:bg-indigo-600 flex justify-center items-center text-white font-bold py-2 px-4 rounded focus:border-none"
        >
          Sign in
        </Link>
        <div className="mt-4 text-right w-full">
          <a
            href="#"
            className="text-blue-800 hover:text-blue-900 text-sm "
            onClick={toggleView}
          >
            Don&#39;t have an account? Sign up
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
