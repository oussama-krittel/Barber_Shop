import React, { useState } from "react";
import NavBar from "../components/NavBar";

const ContactScreen = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Message submitted:", message);
    setMessage(""); // Clear the text field after submission
  };

  return (
    <div className="h-screen w-screen flex ">
      {/* Sidebar with fixed width */}
      <div className="w-1/10 flex-none">
        <NavBar />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <form
            className="w-full max-w-md bg-white shadow-md rounded-lg p-6"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Contact Us
            </h1>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message here..."
                rows="5"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;
