import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = "https://ikonex-academy-1b17.onrender.com";


function Assessments() {
  const [assessments, setAssessments] = useState([]);

  const [formData, setFormData] = useState({
    assessment_id: "",
    term: "",
    year: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/assessments`);
      setAssessments(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
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
          {
            term: formData.term,
            year: formData.year,
          }
        );

        alert("Assessment updated successfully");
      } else {
        await axios.post(
          `${API_URL}/api/assessments`,
          formData
        );

        alert("Assessment added successfully");
      }

      setFormData({
        assessment_id: "",
        term: "",
        year: "",
      });

      setIsEditing(false);
      fetchAssessments();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Operation failed");
    }
  };

  const handleEdit = (a) => {
    setFormData({
      assessment_id: a.assessment_id,
      term: a.term,
      year: a.year,
    });

    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/assessments/${id}`);
      fetchAssessments();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-orange-500 mb-6">
        Assessment Management
      </h1>

      {/* FORM */}
      <div className="bg-gray-800 p-6 rounded-xl mb-8">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">

          <input
  type="text"
  name="assessment_name"
  placeholder="Assessment Name"
/>

<select
  name="assessment_type"
>
  <option value="">
    Select Type
  </option>

  <option value="Continuous Assessment">
    Continuous Assessment
  </option>

  <option value="Examination">
    Examination
  </option>
</select>

<select name="term">
  <option>Term 1</option>
  <option>Term 2</option>
  <option>Term 3</option>
</select>

<input
  type="number"
  name="year"
/>
        </form>
      </div>

      {/* TABLE */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-black">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Term</th>
              <th className="p-4">Year</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {assessments.map((a) => (
              <tr key={a.assessment_id} className="border-b border-gray-700">
                <td className="p-4">{a.assessment_id}</td>
                <td className="p-4">{a.term}</td>
                <td className="p-4">{a.year}</td>

                <td className="p-4">
                  <button
                    onClick={() => handleEdit(a)}
                    className="bg-blue-500 px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(a.assessment_id)}
                    className="bg-red-500 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Assessments;