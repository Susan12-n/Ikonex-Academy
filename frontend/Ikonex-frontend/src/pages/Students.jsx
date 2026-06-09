import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = "https://ikonex-academy-1b17.onrender.com";


function Students() {
  const [students, setStudents] = useState([]);
  const [streams, setStreams] = useState([]);

  const [formData, setFormData] = useState({
    student_id: "",
    admission_no: "",
    first_name: "",
    last_name: "",
    gender: "",
    stream_id: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchStreams();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/students`
      );

      setStudents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStreams = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/streams`
      );

      setStreams(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axios.put(
          `${API_URL}/api/students/${formData.student_id}`,
          formData
        );

        alert("Student updated successfully");
      } else {
        await axios.post(
          `${API_URL}/api/students`,
          formData
        );

        alert("Student added successfully");
      }

      setFormData({
        student_id: "",
        admission_no: "",
        first_name: "",
        last_name: "",
        gender: "",
        stream_id: "",
      });

      setIsEditing(false);
      fetchStudents();

    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  const handleEdit = (student) => {
    setFormData({
      student_id: student.student_id,
      admission_no: student.admission_no,
      first_name: student.first_name,
      last_name: student.last_name,
      gender: student.gender,
      stream_id: student.stream_id,
    });

    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/api/students/${id}`
      );

      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);

    setFormData({
      student_id: "",
      admission_no: "",
      first_name: "",
      last_name: "",
      gender: "",
      stream_id: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-orange-500">
          Student Management
        </h1>

        <p className="text-gray-400 mt-2">
          Register and manage students.
        </p>
      </div>

      {/* Form */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          {isEditing ? "Update Student" : "Add Student"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="student_id"
            placeholder="Student ID"
            value={formData.student_id}
            onChange={handleChange}
            disabled={isEditing}
            required
            className="bg-gray-700 border border-gray-600 rounded-lg p-3"
          />

          <input
            type="text"
            name="admission_no"
            placeholder="Admission Number"
            value={formData.admission_no}
            onChange={handleChange}
            required
            className="bg-gray-700 border border-gray-600 rounded-lg p-3"
          />

          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="bg-gray-700 border border-gray-600 rounded-lg p-3"
          />

          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="bg-gray-700 border border-gray-600 rounded-lg p-3"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="bg-gray-700 border border-gray-600 rounded-lg p-3"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select
            name="stream_id"
            value={formData.stream_id}
            onChange={handleChange}
            required
            className="bg-gray-700 border border-gray-600 rounded-lg p-3"
          >
            <option value="">Select Stream</option>

            {streams.map((stream) => (
              <option
                key={stream.stream_id}
                value={stream.stream_id}
              >
                {stream.stream_name}
              </option>
            ))}
          </select>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold"
            >
              {isEditing ? "Update Student" : "Add Student"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Students Table */}
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-semibold text-orange-500">
            Registered Students
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black">
              <tr>
                <th className="p-4 text-left">Student ID</th>
                <th className="p-4 text-left">Admission No</th>
                <th className="p-4 text-left">First Name</th>
                <th className="p-4 text-left">Last Name</th>
                <th className="p-4 text-left">Gender</th>
                <th className="p-4 text-left">Stream</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr
                    key={student.student_id}
                    className="border-b border-gray-700 hover:bg-gray-700"
                  >
                    <td className="p-4">{student.student_id}</td>

                    <td className="p-4">
                      {student.admission_no}
                    </td>

                    <td className="p-4">
                      {student.first_name}
                    </td>

                    <td className="p-4">
                      {student.last_name}
                    </td>

                    <td className="p-4">
                      {student.gender}
                    </td>

                    <td className="p-4">
                      {student.stream_name || student.stream_id}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleEdit(student)}
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(student.student_id)
                        }
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-6 text-gray-400"
                  >
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Students;