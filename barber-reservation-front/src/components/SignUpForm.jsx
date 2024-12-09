import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUpForm({ toggleView }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleSignUpForm = (evt) => {
    evt.preventDefault();
    setErrors((errors) => ({ ...validateFormData(formData) }));
  };

  const validateFormData = (data) => {
    let errors = {};

    if (data.username === "") {
      errors.username = "This field is required";
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
        <section className="w-full mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            className={`border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary ${
              errors.username ? "border-red-500" : ""
            }`}
            name="username"
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleInputChange}
          />
          {errors.username && (
            <p className="text-red-500 text-xs italic">{errors.username}</p>
          )}
        </section>
        <section className="w-full mb-4">
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
        <section className="w-full mb-4">
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
        <section className="w-full mb-6">
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
        <Link to={"/"} className="w-full bg-indigo-700 hover:bg-indigo-600 flex justify-center items-center text-white font-bold py-2 px-4 rounded focus:border-none">
          Sign Up
        </Link >
        <div className="mt-4 text-right w-full">
          <p
            href=""
            className="text-blue-800 hover:text-blue-950 text-sm cursor-pointer "
            onClick={toggleView}
          >
            Already have an account? Log in
          </p>
        </div>
      </form>
    </div>
  );
}
