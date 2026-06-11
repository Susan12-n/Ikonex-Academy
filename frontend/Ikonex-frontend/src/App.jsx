import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import Streams from "./pages/Streams";
import Subjects from "./pages/Subjects";
import Scores from "./pages/Scores";
import Assessments from "./pages/Assessments";
import Results from "./pages/results";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Teacher Routes */}
        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute role="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
<Route path="/students" element={<Students />} />
<Route path="/add-student" element={<AddStudent />} />
<Route path="/streams" element={<Streams />} />
<Route path="/subjects" element={<Subjects />} />
<Route path="/scores" element={<Scores />} />
<Route path="/assessments" element={<Assessments />} />
<Route path="/results" element={<Results />} />
{/* <Route path="/report/:student_id" element={<Report />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;