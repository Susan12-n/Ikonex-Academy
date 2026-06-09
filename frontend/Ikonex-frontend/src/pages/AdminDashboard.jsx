import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = "https://ikonex-academy-1b17.onrender.com";


function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [streams, setStreams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentsRes = await axios.get(
        (`${API_URL}/api/students`)
      );

      const streamsRes = await axios.get(
        (`${API_URL}/api/streams`)
      );

      const subjectsRes = await axios.get(
        (`${API_URL}/api/subjects`)
      );

      const scoresRes = await axios.get(
        (`${API_URL}/api/scores`)
      );

      setStudents(studentsRes.data);
      setStreams(streamsRes.data);
      setSubjects(subjectsRes.data);
      setScores(scoresRes.data);

    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");

  navigate("/login");
};

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* Top Navbar */}
      <div className="bg-black shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            <span className="text-white">Ikonex</span>
            <span className="text-orange-500"> Academy</span>
          </h1>

          <button
  onClick={handleLogout}
  className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg"
>
  Logout
</button>

        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        <h2 className="text-4xl font-bold mb-2">
          Admin Dashboard
        </h2>

        <p className="text-gray-400 mb-8">
          Welcome to the Student Management System.
        </p>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-orange-500 shadow-lg">
            <h3 className="text-gray-400">Students</h3>
            <p className="text-4xl font-bold text-orange-500 mt-2">
              {students.length}
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-blue-500 shadow-lg">
            <h3 className="text-gray-400">Streams</h3>
            <p className="text-4xl font-bold text-blue-400 mt-2">
              {streams.length}
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-green-500 shadow-lg">
            <h3 className="text-gray-400">Subjects</h3>
            <p className="text-4xl font-bold text-green-400 mt-2">
              {subjects.length}
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-purple-500 shadow-lg">
            <h3 className="text-gray-400">Score Records</h3>
            <p className="text-4xl font-bold text-purple-400 mt-2">
              {scores.length}
            </p>
          </div>

        </div>

        {/* Recent Students */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8">

          <h3 className="text-2xl font-semibold text-orange-500 mb-4">
            Recent Students
          </h3>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3">Name</th>
                  <th className="text-left py-3">Admission No</th>
                  <th className="text-left py-3">Stream</th>
                </tr>
              </thead>

              <tbody>

                {students.slice(0, 5).map((student) => (
                  <tr
                    key={student.student_id}
                    className="border-b border-gray-700"
                  >
                    <td className="py-3">
                      {student.fullname}
                    </td>

                    <td className="py-3">
                      {student.admission_no}
                    </td>

                    <td className="py-3">
                      {student.stream_name}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* Recent Scores */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">

          <h3 className="text-2xl font-semibold text-orange-500 mb-4">
            Recent Scores
          </h3>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3">Student</th>
                  <th className="text-left py-3">Subject</th>
                  <th className="text-left py-3">Score</th>
                </tr>
              </thead>

              <tbody>

                {scores.slice(0, 5).map((score) => (
                  <tr
                    key={score.score_id}
                    className="border-b border-gray-700"
                  >
                    <td className="py-3">
                      {score.student_name}
                    </td>

                    <td className="py-3">
                      {score.subject_name}
                    </td>

                    <td className="py-3 text-orange-500 font-bold">
                      {score.score}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;