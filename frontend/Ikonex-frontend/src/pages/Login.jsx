import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const API_URL = "https://ikonex-academy-1b17.onrender.com";


function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/teacher-dashboard");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">

        {/* Left Section */}
        <div className="bg-black text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-orange-500">Student</span> Management System
          </h1>

          <p className="text-gray-300 leading-relaxed">
            A modern platform designed to simplify student administration,
            academic records management, assessments, report generation,
            and performance tracking for educational institutions.
          </p>

          <div className="mt-8">
            <div className="h-1 w-24 bg-orange-500 rounded"></div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-gray-800 p-10">
          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-400 text-center mb-8">
            Sign in to access your dashboard
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-gray-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              Login
            </button>

            <p className="text-center text-gray-400 mt-6">
              Don't have an account?
              <Link
                to="/register"
                className="text-orange-500 font-semibold ml-2 hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;