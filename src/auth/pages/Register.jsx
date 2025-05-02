import React, { useState } from "react";
import { api } from "../../axios/ApiAxios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear any previous errors

    try {
      // Send registration details to the API
      const response = await api.post("/api/auth/Register", {
        name,
        email,
        password,
      });

      // Save the token in localStorage
      localStorage.setItem("token", response.data.token);

      // Navigate to the home page after successful registration
      setTimeout(() => {
        navigate("/app/dashboard");
      }, 1500);
    } catch (err) {
      // Log the error for debugging
      console.error("Error registering user:", err.response?.data || err.message);

      // Handle specific error cases
      if (err.response?.status === 400) {
        if (err.response.data?.error === "User already exists") {
          setError("This email is already registered. Please log in or use a different email.");
        } else {
          setError("Invalid input. Please check your details and try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  const renderError = () => {
    return error ? (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    ) : null;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create an Account
        </h2>
        {renderError()}
        <form onSubmit={handleSubmit} aria-label="Registration Form">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Enter your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:text-blue-700 underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;