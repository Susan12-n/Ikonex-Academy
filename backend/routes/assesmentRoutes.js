import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://ikonex-academy-1b17.onrender.com";

function Assessments() {
  const [assessments, setAssessments] = useState([]);

  const [formData, setFormData] = useState({
    assessment_id: "",
    assessment_name: "",
    assessment_type: "",
    term: "",
    year: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/assessments`
      );

      setAssessments(res.data);
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
          `${API_URL}/api/assessments/${formData.assessment_id}`,
          formData
        );

        alert("Assessment updated successfully");
      } else {
        await axios.post(
          `${API_URL}/api/assessments`,
          formData
        );

        alert("Assessment created successfully");
      }

      resetForm();
      fetchAssessments();

    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  const handleEdit = (assessment) => {
    setFormData({
      assessment_id: assessment.assessment_id,
      assessment_name: assessment.assessment_name,
      assessment_type: assessment.assessment_type,
      term: assessment.term,
      year: assessment.year,
    });

    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this assessment?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/api/assessments/${id}`
      );

      fetchAssessments();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      assessment_id: "",
      assessment_name: "",
      assessment_type: "",
      term: "",
      year: "",
    });

    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-orange-500">
          Assessment Management
        </h1>

        <p className="text-gray-400 mt-2">
          Manage CATs, assignments and examinations.
        </p>
      </div>

      {/* FORM */}

      <div className="bg-gray-800 p-6 rounded-xl mb-8">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">

          {isEditing
            ? "Update Assessment"
            : "Create Assessment"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="assessment_id"
            placeholder="Assessment ID"
            value={formData.assessment_id}
            onChange={handleChange}
            disabled={isEditing}
            required
            className="bg-gray-700 p-3 rounded-lg"
          />

          <input
            type="text"
            name="assessment_name"
            placeholder="Assessment Name"
            value={formData.assessment_name}
            onChange={handleChange}
            required
            className="bg-gray-700 p-3 rounded-lg"
          />

          <select
            name="assessment_type"
            value={formData.assessment_type}
            onChange={handleChange}
            required
            className="bg-gray-700 p-3 rounded-lg"
          >
            <option value="">
              Select Assessment Type
            </option>

            <option value="Continuous Assessment">
              Continuous Assessment
            </option>

            <option value="Examination">
              Examination
            </option>
          </select>

          <select
            name="term"
            value={formData.term}
            onChange={handleChange}
            required
            className="bg-gray-700 p-3 rounded-lg"
          >
            <option value="">
              Select Term
            </option>

            <option value="Term 1">
              Term 1
            </option>

            <option value="Term 2">
              Term 2
            </option>

            <option value="Term 3">
              Term 3
            </option>
          </select>

          <input
            type="number"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            required
            className="bg-gray-700 p-3 rounded-lg"
          />

          <div className="flex gap-3">

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg"
            >
              {isEditing
                ? "Update Assessment"
                : "Create Assessment"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg"
              >
                Cancel
              </button>
            )}

          </div>

        </form>
      </div>

      {/* TABLE */}

      <div className="bg-gray-800 rounded-xl overflow-hidden">

        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-semibold text-orange-500">
            Assessments
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-black">

              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Term</th>
                <th className="p-4 text-left">Year</th>
                <th className="p-4 text-center">Actions</th>
              </tr>

            </thead>

            <tbody>

              {assessments.length > 0 ? (

                assessments.map((assessment) => (

                  <tr
                    key={assessment.assessment_id}
                    className="border-b border-gray-700 hover:bg-gray-700"
                  >

                    <td className="p-4">
                      {assessment.assessment_id}
                    </td>

                    <td className="p-4">
                      {assessment.assessment_name}
                    </td>

                    <td className="p-4">
                      {assessment.assessment_type}
                    </td>

                    <td className="p-4">
                      {assessment.term}
                    </td>

                    <td className="p-4">
                      {assessment.year}
                    </td>

                    <td className="p-4 text-center">

                      <button
                        onClick={() =>
                          handleEdit(assessment)
                        }
                        className="bg-blue-500 px-4 py-2 rounded-lg mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            assessment.assessment_id
                          )
                        }
                        className="bg-red-500 px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6 text-gray-400"
                  >
                    No assessments found.
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

export default Assessments;