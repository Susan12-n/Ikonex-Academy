import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = "https://ikonex-academy-1b17.onrender.com";


function Scores() {
  const [scores, setScores] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [assessments, setAssessments] = useState([]);

  const [formData, setFormData] = useState({
    score_id: "",
    student_id: "",
    subject_id: "",
    assessment_id: "",
    marks: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchScores();
    fetchStudents();
    fetchSubjects();
    fetchAssessments();
  }, []);

  const fetchScores = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/scores`
      );
      setScores(res.data);
    } catch (error) {
      console.error(error);
    }
  };

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
          `${API_URL}/api/scores/${formData.score_id}`,
          formData
        );

        alert("Score updated successfully");
      } else {
        await axios.post(
          `${API_URL}/api/scores`,
          formData
        );

        alert("Score added successfully");
      }

      setFormData({
        score_id: "",
        student_id: "",
        subject_id: "",
        assessment_id: "",
        marks: "",
      });

      setIsEditing(false);
      fetchScores();

    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  const handleEdit = (score) => {
    setFormData({
      score_id: score.score_id,
      student_id: score.student_id,
      subject_id: score.subject_id,
      assessment_id: score.assessment_id,
      marks: score.marks,
    });

    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this score?")) return;

    try {
      await axios.delete(
        `${API_URL}/api/scores/${id}`
      );

      fetchScores();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-orange-500 mb-6">
        Score Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl grid md:grid-cols-2 gap-4 mb-8"
      >
        <select
          name="student_id"
          value={formData.student_id}
          onChange={handleChange}
          required
          className="bg-gray-700 p-3 rounded"
        >
          <option value="">Select Student</option>

          {students.map((student) => (
            <option
              key={student.student_id}
              value={student.student_id}
            >
              {student.first_name} {student.last_name}
            </option>
          ))}
        </select>

        <select
          name="subject_id"
          value={formData.subject_id}
          onChange={handleChange}
          required
          className="bg-gray-700 p-3 rounded"
        >
          <option value="">Select Subject</option>

          {subjects.map((subject) => (
            <option
              key={subject.subject_id}
              value={subject.subject_id}
            >
              {subject.subject_name}
            </option>
          ))}
        </select>

        <select
          name="assessment_id"
          value={formData.assessment_id}
          onChange={handleChange}
          required
          className="bg-gray-700 p-3 rounded"
        >
          <option value="">Select Assessment</option>

          {assessments.map((assessment) => (
            <option
              key={assessment.assessment_id}
              value={assessment.assessment_id}
            >
              {assessment.assessment_name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="marks"
          placeholder="Marks"
          value={formData.marks}
          onChange={handleChange}
          required
          className="bg-gray-700 p-3 rounded"
        />

        <button
          type="submit"
          className="bg-orange-500 py-3 rounded font-semibold"
        >
          {isEditing ? "Update Score" : "Save Score"}
        </button>
      </form>

      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-black">
            <tr>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Subject</th>
              <th className="p-4 text-left">Assessment</th>
              <th className="p-4 text-left">Marks</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {scores.map((score) => (
              <tr
                key={score.score_id}
                className="border-b border-gray-700"
              >
                <td className="p-4">{score.student_name}</td>
                <td className="p-4">{score.subject_name}</td>
                <td className="p-4">{score.assessment_name}</td>
                <td className="p-4">{score.marks}</td>

                <td className="p-4 text-center">
                  <button
                    onClick={() => handleEdit(score)}
                    className="bg-blue-500 px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(score.score_id)
                    }
                    className="bg-red-500 px-4 py-2 rounded"
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

export default Scores;