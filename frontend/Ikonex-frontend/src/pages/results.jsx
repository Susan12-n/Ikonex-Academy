import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = "https://ikonex-academy-1b17.onrender.com";


function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/results/class-results`);
      setResults(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadReport = (student_id) => {
  window.open(
    `${API_URL}/api/report/${student_id}`,
    "_blank"
  );
};

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl text-orange-500 font-bold mb-6">
        Class Ranking
      </h1>

      <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-black">
          <tr>
            <th className="p-3">Position</th>
            <th className="p-3">Student</th>
            <th className="p-3">Total Marks</th>
            <th className="p-3">Average</th>
          </tr>
        </thead>

        <tbody>
          {results.map((r) => (
            <tr key={r.student_id} className="border-b border-gray-700">
              <td className="p-3">{r.position}</td>
              <td className="p-3">
                {r.first_name} {r.last_name}
              </td>
              <td className="p-3">{r.total_marks}</td>
              <td className="p-3">{Number(r.average_marks).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  <button
  onClick={() => downloadReport(student.student_id)}
  className="bg-green-500 px-3 py-1 rounded ml-2"
>
  Download Report
</button>
}

export default Results;