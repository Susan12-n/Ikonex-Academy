import { useState } from "react";
import axios from "axios";
const API_URL = "https://ikonex-academy-1b17.onrender.com";


function AddStudent() {
  const [formData, setFormData] = useState({
    fullname: "",
    admission_no: "",
    stream_id: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/students",
        formData
      );

      alert("Student Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">
        Add Student
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg"
      >
        <input
          type="text"
          name="fullname"
          placeholder="Student Name"
          onChange={handleChange}
          className="w-full mb-4 p-3 bg-gray-700 rounded"
        />

        <input
          type="text"
          name="admission_no"
          placeholder="Admission Number"
          onChange={handleChange}
          className="w-full mb-4 p-3 bg-gray-700 rounded"
        />

        <button
          type="submit"
          className="bg-orange-500 px-6 py-3 rounded"
        >
          Save Student
        </button>
      </form>
    </div>
  );
}

export default AddStudent;