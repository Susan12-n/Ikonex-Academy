import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TeacherSidebar from "../components/TeacherSidebar";

const API_URL = "https://ikonex-academy-1b17.onrender.com";

function TeacherDashboard() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [streams, setStreams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentsRes, streamsRes, subjectsRes, scoresRes] =
        await Promise.all([
          axios.get(`${API_URL}/api/students`),
          axios.get(`${API_URL}/api/streams`),
          axios.get(`${API_URL}/api/subjects`),
          axios.get(`${API_URL}/api/scores`),
        ]);

      setStudents(studentsRes.data);
      setStreams(streamsRes.data);
      setSubjects(subjectsRes.data);
      setScores(scoresRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">

      {/* Sidebar */}
      <TeacherSidebar />

      {/* Main Content */}
      <div className="flex-1">

        {/* Top Header */}
        <div className="bg-black border-b border-gray-800 px-8 py-6">
          <h1 className="text-3xl font-bold text-orange-500">
            Teacher Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome back. Manage students, streams,
            assessments and score records efficiently.
          </p>
        </div>

        <div className="p-8">

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
              <h3 className="text-gray-400">Students</h3>
              <p className="text-4xl font-bold mt-2 text-orange-500">
                {students.length}
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
              <h3 className="text-gray-400">Streams</h3>
              <p className="text-4xl font-bold mt-2 text-blue-400">
                {streams.length}
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-green-500">
              <h3 className="text-gray-400">Subjects</h3>
              <p className="text-4xl font-bold mt-2 text-green-400">
                {subjects.length}
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
              <h3 className="text-gray-400">Scores</h3>
              <p className="text-4xl font-bold mt-2 text-purple-400">
                {scores.length}
              </p>
            </div>

          </div>

          {/* Quick Actions */}
          <h2 className="text-2xl font-bold mb-6 text-orange-500">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div
              onClick={() => navigate("/students")}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 cursor-pointer transition"
            >
              <h3 className="text-xl font-semibold text-orange-500">
                Add Student
              </h3>
              <p className="text-gray-400 mt-2">
                Register new students into the system.
              </p>
            </div>

            <div
              onClick={() => navigate("/students")}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 cursor-pointer transition"
            >
              <h3 className="text-xl font-semibold text-orange-500">
                View Students
              </h3>
              <p className="text-gray-400 mt-2">
                View and manage student records.
              </p>
            </div>

            <div
              onClick={() => navigate("/streams")}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 cursor-pointer transition"
            >
              <h3 className="text-xl font-semibold text-orange-500">
                Streams
              </h3>
              <p className="text-gray-400 mt-2">
                Manage classes and streams.
              </p>
            </div>

            <div
              onClick={() => navigate("/scores")}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 cursor-pointer transition"
            >
              <h3 className="text-xl font-semibold text-orange-500">
                Enter Scores
              </h3>
              <p className="text-gray-400 mt-2">
                Record student marks and results.
              </p>
            </div>

            <div
              onClick={() => navigate("/subjects")}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 cursor-pointer transition"
            >
              <h3 className="text-xl font-semibold text-orange-500">
                Subjects
              </h3>
              <p className="text-gray-400 mt-2">
                Manage subjects offered in school.
              </p>
            </div>

            <div
              onClick={() => navigate("/assessments")}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 cursor-pointer transition"
            >
              <h3 className="text-xl font-semibold text-orange-500">
                Assessments
              </h3>
              <p className="text-gray-400 mt-2">
                Manage CATs, exams and assignments.
              </p>
            </div>

          </div>

          {/* Recent Students */}
          <div className="bg-gray-800 rounded-xl p-6 mt-10 shadow-lg">

            <h2 className="text-2xl font-bold text-orange-500 mb-4">
              Recent Students
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">

                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3">First Name</th>
                    <th className="text-left py-3">Last Name</th>
                    <th className="text-left py-3">Admission No</th>
                  </tr>
                </thead>

                <tbody>
                  {students.slice(0, 5).map((student) => (
                    <tr
                      key={student.student_id}
                      className="border-b border-gray-700"
                    >
                      <td className="py-3">
                        {student.firstname}
                      </td>

                      <td className="py-3">
                        {student.lastname}
                      </td>

                      <td className="py-3">
                        {student.admission_no}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;