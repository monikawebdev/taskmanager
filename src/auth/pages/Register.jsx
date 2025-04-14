import React,{useState} from 'react'
import { api  } from "../../axios/ApiAxios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [remembered, setRemembered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
  
      try {
        const response = await api.post("/api/auth/Register", {
          name,
          email,
          password,
          remembered,
        });
  
        // Save token to localStorage
        localStorage.setItem("token", response.data.token);

        // Navigate to the home page after successful registration
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } catch (err) {
        // Handle error
        console.error(err);
        setError(err.response?.data?.message || "Register failed. Please try again.");
      } finally {
        setLoading(false);
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
        <form
          onSubmit={handleSubmit}
          aria-label="Registration Form"
          className="animate-fade-in"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Enter your Name
             </label>
              <input
                type="name"
                id="name"
                placeholder="Enter your name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
                aria-required="true"
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
                autoComplete="email"
                required
                aria-required="true"
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
                autoComplete="new-password"
                required
                aria-required="true"
              />
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={remembered}
                  onChange={(e) => setRemembered(e.target.checked)}
                />
                <span className="ml-2 text-gray-700">Remember Me</span>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
                aria-busy={loading}
              >
                 {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.969 7.969 0 014 12H0c0 2.042.623 3.937 1.709 5.517l2.291-2.226z"
                    ></path>
                  </svg>
                  Registering...
                </>
              ) : (
                "Register"
              )}
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
             Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Login here
          </a>
         </p>
        </div>
      </div>
    );
  };
  
  export default Register;