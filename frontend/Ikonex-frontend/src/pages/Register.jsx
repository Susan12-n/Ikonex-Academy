import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "teacher",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }
      );

      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl grid md:grid-cols-2 bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">

        {/* Left Section */}
        <div className="bg-black text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-orange-500">Student</span> Management System
          </h1>

          <p className="text-gray-300 leading-relaxed">
            Join our modern academic management platform designed
            to simplify student registration, assessments,
            report generation, class management, and academic
            performance tracking.
          </p>

          <div className="mt-8">
            <div className="h-1 w-24 bg-orange-500 rounded"></div>
          </div>

          <div className="mt-8 space-y-3">
            <p className="text-gray-400">
              ✓ Manage Students Efficiently
            </p>
            <p className="text-gray-400">
              ✓ Track Academic Performance
            </p>
            <p className="text-gray-400">
              ✓ Generate Report Cards
            </p>
            <p className="text-gray-400">
              ✓ Manage Subjects & Assessments
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-gray-800 p-8 md:p-10">
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            Create Account
          </h2>

          <p className="text-center text-gray-400 mb-8">
            Register to access the system
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
            >
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
            />

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              Register
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?
            <Link
              to="/login"
              className="text-orange-500 font-semibold ml-2 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;