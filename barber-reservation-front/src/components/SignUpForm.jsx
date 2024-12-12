import React, { useState } from "react";
import { register } from "../services/user";

export default function SignUpForm({ toggleView }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUpForm = async (evt) => {
    evt.preventDefault();

    const validationErrors = validateFormData(formData);
    setErrors(validationErrors);
    setErrorMessage("");

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        console.log("Registering user...");
        const registerResponse = await register({
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          password: formData.password,
        });

        console.log("********************", registerResponse);

        if (registerResponse.status == 200) {
          toggleView();
        } else {
          setErrorMessage(registerResponse || "Registration failed.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        if (error.response) {
          setErrorMessage(error.response.data.token || "Registration failed.");
        } else if (error.request) {
          setErrorMessage("Network error: Please try again later.");
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const validateFormData = (data) => {
    let errors = {};

    if (data.firstName === "") {
      errors.firstName = "This field is required";
    }
    if (data.lastName === "") {
      errors.lastName = "This field is required";
    }
    if (data.email === "") {
      errors.email = "This field is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Invalid email address";
    }
    if (data.password === "") {
      errors.password = "This field is required";
    }
    if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleInputChange = (evt) => {
    evt.persist();
    setFormData((data) => ({
      ...data,
      [evt.target.name]: evt.target.value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <form
        className="flex flex-col items-center w-2/5 bg-white p-8 shadow-md rounded"
        onSubmit={handleSignUpForm}
      >
        {/* First Name */}
        <section className="w-full mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            id="firstName"
            className={`border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary ${
              errors.firstName ? "border-red-500" : ""
            }`}
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs italic">{errors.firstName}</p>
          )}
        </section>

        {/* Last Name */}
        <section className="w-full mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            id="lastName"
            className={`border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary ${
              errors.lastName ? "border-red-500" : ""
            }`}
            name="lastName"
            type="text"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs italic">{errors.lastName}</p>
          )}
        </section>

        {/* Email */}
        <section className="w-full mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            className={`border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary ${
              errors.email ? "border-red-500" : ""
            }`}
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </section>

        {/* Password */}
        <section className="w-full mb-2">
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
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </section>

        {/* Confirm Password */}
        <section className="w-full mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            className={`border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs italic">
              {errors.confirmPassword}
            </p>
          )}
        </section>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-700 hover:bg-indigo-600 flex justify-center items-center text-white font-bold py-2 px-4 rounded focus:border-none"
        >
          {loading ? (
            <div className="loader"></div> // Add your loader component here
          ) : (
            "Sign Up"
          )}
        </button>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-xs italic mt-2">{errorMessage}</p>
        )}

        {/* Login Link */}
        <div className="mt-2 text-right w-full">
          <p
            href=""
            className="text-blue-800 hover:text-blue-950 text-sm cursor-pointer"
            onClick={toggleView}
          >
            Already have an account? Log in
          </p>
        </div>
      </form>
    </div>
  );
}
