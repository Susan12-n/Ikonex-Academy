import { Link, useNavigate } from "react-router-dom";

function TeacherSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <div className="w-64 bg-black min-h-screen shadow-xl">

      {/* Logo */}
      <div className="p-6 border-b border-gray-800">

        <h1 className="text-2xl font-bold">
          <span className="text-white">Ikonex</span>
          <span className="text-orange-500"> Academy</span>
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          Teacher Portal
        </p>

      </div>

      {/* Menu */}
      <div className="p-4">

        <Link
          to="/teacher-dashboard"
          className="block py-3 px-4 rounded-lg text-gray-300 hover:bg-orange-500 hover:text-white transition mb-2"
        >
          Dashboard
        </Link>

        <Link
          to="/students"
          className="block py-3 px-4 rounded-lg text-gray-300 hover:bg-orange-500 hover:text-white transition mb-2"
        >
          Students
        </Link>

                <Link
          to="/streams"
          className="block py-3 px-4 rounded-lg text-gray-300 hover:bg-orange-500 hover:text-white transition mb-2"
        >
          Streams
        </Link>

        <Link
          to="/subjects"
          className="block py-3 px-4 rounded-lg text-gray-300 hover:bg-orange-500 hover:text-white transition mb-2"
        >
          Subjects
        </Link>

        <Link
          to="/scores"
          className="block py-3 px-4 rounded-lg text-gray-300 hover:bg-orange-500 hover:text-white transition mb-2"
        >
          Scores
        </Link>

        <Link
          to="/assessments"
          className="block py-3 px-4 rounded-lg text-gray-300 hover:bg-orange-500 hover:text-white transition mb-2"
        >
          Assessments
        </Link>

      </div>

      {/* Logout */}
      <div className="absolute bottom-0 w-64 p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default TeacherSidebar;