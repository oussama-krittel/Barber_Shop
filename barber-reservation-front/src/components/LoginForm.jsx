import React, { useState } from "react";
import { login, getJwt, getCurrentUser } from "../services/user"; // Import your auth services

const LoginForm = ({ toggleView }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginForm = async (evt) => {
    evt.preventDefault();
    const validationErrors = validateCredentials(credentials);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("Logging in...");
        const loginResponse = await login(
          credentials.username,
          credentials.password
        );

        console.log("login responce *******", loginResponse);

        if (loginResponse.status == 200) {
          console.log("Login successful!");
          console.log("Response:", loginResponse);

          const token = getJwt();
          console.log("Token:", token);

          const decodedUser = await getCurrentUser();
          console.log("User:", decodedUser);
          window.location.reload();
        } else {
          setErrorMessage(
            "Login failed: " + (loginResponse.error || "Unknown error")
          );
        }
      } catch (error) {
        console.error("Error during login:", error);
        if (error.response) {
          setErrorMessage(error.response.data.token || "Login failed.");
        } else if (error.request) {
          setErrorMessage("Network error: Please try again later.");
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      }
    }
  };

  const validateCredentials = (credentials) => {
    let errors = {};

    if (credentials.username === "") {
      errors = { ...errors, username: "This field is required" };
    }

    if (credentials.password === "") {
      errors = { ...errors, password: "This field is required" };
    }

    return errors;
  };

  const handleInputChange = (evt) => {
    evt.persist();
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [evt.target.name]: evt.target.value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <form
        className="flex flex-col items-center w-2/5 bg-white p-8 shadow-sm rounded"
        onSubmit={handleLoginForm}
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
            className={`border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary ${
              errors.username ? "border-red-500" : ""
            }`}
            name="username"
            type="text"
            placeholder="e.g. some.example"
            value={credentials.username}
            onChange={handleInputChange}
          />
          {errors.username && (
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
            className={`border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary ${
              errors.password ? "border-red-500" : ""
            }`}
            name="password"
            type="password"
            placeholder="* * * * * * * *"
            value={credentials.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </section>
        <button
          type="submit"
          className="w-full bg-indigo-700 hover:bg-indigo-600 flex justify-center items-center text-white font-bold py-2 px-4 rounded focus:border-none"
        >
          Sign in
        </button>
        <div className="mt-4 text-right w-full">
          <a
            href="#"
            className="text-blue-800 hover:text-blue-900 text-sm "
            onClick={toggleView}
          >
            Don&#39;t have an account? Sign up
          </a>
        </div>

        {/* Display Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-xs italic mt-2">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
