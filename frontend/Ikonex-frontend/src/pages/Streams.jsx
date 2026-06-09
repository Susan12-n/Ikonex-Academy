import { useEffect, useState } from "react";
import axios from "axios";
import TeacherSidebar from "../components/TeacherSidebar";
const API_URL = "https://ikonex-academy-1b17.onrender.com";


function Streams() {
  const [streams, setStreams] = useState([]);

  const [formData, setFormData] = useState({
    stream_id: "",
    stream_name: "",
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/streams`
      );

      setStreams(res.data);
    } catch (error) {
      console.log(error);
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
      if (editing) {
        await axios.put(
          `${API_URL}/api/streams/${formData.stream_id}`,
          {
            stream_name: formData.stream_name,
          }
        );

        alert("Stream Updated Successfully");
      } else {
        await axios.post(
          `${API_URL}/api/streams`,
          formData
        );

        alert("Stream Added Successfully");
      }

      setFormData({
        stream_id: "",
        stream_name: "",
      });

      setEditing(false);

      fetchStreams();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (stream) => {
    setFormData({
      stream_id: stream.stream_id,
      stream_name: stream.stream_name,
    });

    setEditing(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this stream?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/api/streams/${id}`
      );

      fetchStreams();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">

      <TeacherSidebar />

      <div className="flex-1 p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-orange-500">
            Stream Management
          </h1>

          <p className="text-gray-400 mt-2">
            Add, update and manage school streams.
          </p>
        </div>

        {/* Form */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg mb-8">

          <h2 className="text-2xl font-semibold text-orange-500 mb-4">
            {editing ? "Update Stream" : "Add New Stream"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4"
          >

            <input
              type="text"
              name="stream_id"
              placeholder="Stream ID"
              value={formData.stream_id}
              onChange={handleChange}
              disabled={editing}
              className="bg-gray-700 p-3 rounded-lg outline-none border border-gray-600 focus:border-orange-500"
            />

            <input
              type="text"
              name="stream_name"
              placeholder="Stream Name"
              value={formData.stream_name}
              onChange={handleChange}
              required
              className="bg-gray-700 p-3 rounded-lg outline-none border border-gray-600 focus:border-orange-500"
            />

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 py-3 rounded-lg font-semibold transition"
            >
              {editing ? "Update Stream" : "Add Stream"}
            </button>

          </form>

        </div>

        {/* Streams Table */}
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">

          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-semibold text-orange-500">
              Available Streams
            </h2>
          </div>

          <table className="w-full">

            <thead className="bg-black">
              <tr>
                <th className="p-4 text-left">Stream ID</th>
                <th className="p-4 text-left">Stream Name</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>

              {streams.map((stream) => (
                <tr
                  key={stream.stream_id}
                  className="border-b border-gray-700"
                >

                  <td className="p-4">
                    {stream.stream_id}
                  </td>

                  <td className="p-4">
                    {stream.stream_name}
                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() => handleEdit(stream)}
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(stream.stream_id)
                      }
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
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
    </div>
  );
}

export default Streams;