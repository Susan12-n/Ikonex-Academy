import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://ikonex-academy-1b17.onrender.com";

function Assessments() {
  const [assessments, setAssessments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    assessment_id: "",
    assessment_name: "",
    assessment_type: "",
    term: "",
    year: "",
  });

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

    setShowForm(true);
    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-orange-500">
            Assessment Management
          </h1>

          <p className="text-gray-400 mt-2">
            Manage examinations and continuous assessments.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-lg"
        >
          {showForm
            ? "Close Form"
            : "Add Assessment"}
        </button>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400">
            Total Assessments
          </h3>

          <p className="text-3xl font-bold text-orange-500">
            {assessments.length}
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400">
            Continuous Assessments
          </h3>

          <p className="text-3xl font-bold text-blue-400">
            {
              assessments.filter(
                (a) =>
                  a.assessment_type ===
                  "Continuous Assessment"
              ).length
            }
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400">
            Examinations
          </h3>

          <p className="text-3xl font-bold text-green-400">
            {
              assessments.filter(
                (a) =>
                  a.assessment_type ===
                  "Examination"
              ).length
            }
          </p>
        </div>

      </div>

      {/* Form */}

      {showForm && (
        <div className="bg-gray-800 p-6 rounded-lg mb-8">

          <h2 className="text-2xl text-orange-500 mb-4">

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
              className="bg-gray-700 p-3 rounded"
            />

            <input
              type="text"
              name="assessment_name"
              placeholder="Assessment Name"
              value={formData.assessment_name}
              onChange={handleChange}
              required
              className="bg-gray-700 p-3 rounded"
            />

            <select
              name="assessment_type"
              value={formData.assessment_type}
              onChange={handleChange}
              required
              className="bg-gray-700 p-3 rounded"
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
              className="bg-gray-700 p-3 rounded"
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
              className="bg-gray-700 p-3 rounded"
            />

            <div className="flex gap-3">

              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded"
              >
                {isEditing
                  ? "Update"
                  : "Save"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-600 hover:bg-gray-700 px-5 py-3 rounded"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>
      )}

      {/* Table */}

      <div className="bg-gray-800 rounded-lg overflow-hidden">

        <div className="p-4 border-b border-gray-700">
          <h2 className="text-2xl text-orange-500">
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
                <th className="p-4 text-center">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {assessments.length > 0 ? (

                assessments.map((assessment) => (

                  <tr
                    key={assessment.assessment_id}
                    className="border-b border-gray-700"
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
                        className="bg-blue-500 px-4 py-2 rounded mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            assessment.assessment_id
                          )
                        }
                        className="bg-red-500 px-4 py-2 rounded"
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