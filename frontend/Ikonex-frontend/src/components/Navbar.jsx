import { Link } from "react-router-dom";
import logo from "../assets/ikonex-logo.png"; 

function Navbar() {
  return (
    <nav className="bg-black/95 backdrop-blur-md shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo + Brand */}
        <div className="flex items-center gap-3">

          <img
            src={logo}
            alt="Ikonex Academy Logo"
            className="w-14 h-14 object-contain"
          />

          <div className="leading-tight">
            <h1 className="text-2xl font-bold">
              <span className="text-white">Ikonex</span>
              <span className="text-orange-500"> Academy</span>
            </h1>

            <p className="text-xs text-gray-400">
              Student Management System
            </p>
          </div>

        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 text-white font-medium">

          <li>
            <a
              href="#home"
              className="hover:text-orange-500 transition duration-300"
            >
              Home
            </a>
          </li>


          <li>
            <a
              href="#contact"
              className="hover:text-orange-500 transition duration-300"
            >
              Contact
            </a>
          </li>

          <li>
            <Link
              to="/login"
              className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg transition"
            >
              Login
            </Link>
          </li>

          <li>
            <Link
              to="/register"
              className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-5 py-2 rounded-lg transition"
            >
              Register
            </Link>
          </li>

        </ul>

      </div>
    </nav>
  );
}

export default Navbar;