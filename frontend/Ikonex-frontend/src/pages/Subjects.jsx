import { useEffect, useState } from "react";
import axios from "axios";

function Subjects() {
  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    subject_id: "",
    subject_name: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/subjects`
      );

      setSubjects(res.data);
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
          `${API_URL}/api/subjects/${formData.subject_id}`,
          {
            subject_name: formData.subject_name,
          }
        );

        alert("Subject updated successfully");
      } else {
        await axios.post(
          `${API_URL}/api/subjects`,
          formData
        );

        alert("Subject added successfully");
      }

      setFormData({
        subject_id: "",
        subject_name: "",
      });

      setIsEditing(false);
      fetchSubjects();

    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  const handleEdit = (subject) => {
    setFormData({
      subject_id: subject.subject_id,
      subject_name: subject.subject_name,
    });

    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/api/subjects/${id}`
      );

      fetchSubjects();
    } catch (error) {
      console.error(error);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);

    setFormData({
      subject_id: "",
      subject_name: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-orange-500">
          Subject Management
        </h1>

        <p className="text-gray-400 mt-2">
          Create, update and manage school subjects.
        </p>
      </div>

      {/* Form */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          {isEditing ? "Update Subject" : "Add New Subject"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="subject_id"
            placeholder="Subject ID"
            value={formData.subject_id}
            onChange={handleChange}
            disabled={isEditing}
            required
            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:border-orange-500 focus:outline-none"
          />

          <input
            type="text"
            name="subject_name"
            placeholder="Subject Name"
            value={formData.subject_name}
            onChange={handleChange}
            required
            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:border-orange-500 focus:outline-none"
          />

          <div className="flex gap-3">

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold"
            >
              {isEditing ? "Update Subject" : "Add Subject"}
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

      {/* Subjects Table */}
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">

        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-semibold text-orange-500">
            Available Subjects
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-black">
              <tr>
                <th className="p-4 text-left">Subject ID</th>
                <th className="p-4 text-left">Subject Name</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>

              {subjects.length > 0 ? (
                subjects.map((subject) => (
                  <tr
                    key={subject.subject_id}
                    className="border-b border-gray-700 hover:bg-gray-700"
                  >
                    <td className="p-4">
                      {subject.subject_id}
                    </td>

                    <td className="p-4">
                      {subject.subject_name}
                    </td>

                    <td className="p-4 text-center">

                      <button
                        onClick={() => handleEdit(subject)}
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(subject.subject_id)
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
                    colSpan="3"
                    className="text-center p-6 text-gray-400"
                  >
                    No subjects found.
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

export default Subjects;