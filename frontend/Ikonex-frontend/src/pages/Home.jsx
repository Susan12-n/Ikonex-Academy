import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  FaGoogle,
  FaMicrosoft,
  FaAmazon,
  FaApple,
} from "react-icons/fa";
import logo from "../assets/ikonex-logo.png";

function Home() {
  return (
    <div className="bg-gray-800 text-white min-h-screen">
      
       <Navbar />
      <section
  id="home"
  className="relative min-h-screen flex items-center justify-center overflow-hidden"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>

  {/* Decorative Blur Circles */}
  <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"></div>
  <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>

  {/* Content */}
  <div className="relative z-10 max-w-5xl mx-auto px-6">

    <div
      className="
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        shadow-[0_8px_32px_rgba(0,0,0,0.37)]
        rounded-[32px]
        p-8 md:p-14
        text-center
      "
    >

      {/* Badge */}
      <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-white/10 border border-white/20 text-white text-sm">
        🎓 Modern School Administration Platform
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
        Student Management
        <span className="block text-orange-500">
          System
        </span>
      </h1>

      <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-10">
        Manage students, teachers, streams, assessments, report cards,
        and academic performance through a centralized platform built
        to simplify school administration and improve efficiency.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-5">

        <Link to="/login">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition duration-300 hover:scale-105">
            Get Started
          </button>
        </Link>

        <a href="#features">
          <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition duration-300 hover:bg-white hover:text-black">
            Learn More
          </button>
        </a>

      </div>

    </div>

  </div>
</section>

      {/* Partners Section */}
<section className="bg-gray-800 py-16">
  <h2 className="text-center text-4xl font-bold mb-4 text-orange-500">
    Our Partners
  </h2>

  <p className="text-center text-gray-400 mb-10">
    Working with leading technology and education partners.
  </p>

  <marquee scrollamount="6" behavior="scroll" direction="left">
    <div className="flex gap-8 py-4">

      <div className="bg-gray-900 w-56 p-6 rounded-xl shadow-lg text-center">
        <FaGoogle className="text-5xl text-orange-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-white">
          Google
        </h3>
      </div>

      <div className="bg-gray-900 w-56 p-6 rounded-xl shadow-lg text-center">
        <FaMicrosoft className="text-5xl text-orange-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-white">
          Microsoft
        </h3>
      </div>

      <div className="bg-gray-900 w-56 p-6 rounded-xl shadow-lg text-center">
        <FaAmazon className="text-5xl text-orange-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-white">
          Amazon
        </h3>
      </div>

      <div className="bg-gray-900 w-56 p-6 rounded-xl shadow-lg text-center">
        <FaApple className="text-5xl text-orange-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-white">
          Apple
        </h3>
      </div>

      {/* Duplicate cards for smoother continuous scrolling */}

      <div className="bg-gray-900 w-56 p-6 rounded-xl shadow-lg text-center">
        <FaGoogle className="text-5xl text-orange-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-white">
          Google
        </h3>
      </div>

      <div className="bg-gray-900 w-56 p-6 rounded-xl shadow-lg text-center">
        <FaMicrosoft className="text-5xl text-orange-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-white">
          Microsoft
        </h3>
      </div>

    </div>
  </marquee>
</section>

      {/* Testimonials */}
      <section className="py-20 bg-black px-6">
  <h2 className="text-center text-4xl font-bold mb-12 text-orange-500">
    Testimonials
  </h2>

  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="Principal"
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />
      <p className="italic text-gray-300">
        "This system has transformed how we manage student records."
      </p>
      <h4 className="mt-4 font-bold text-orange-500">
        School Principal
      </h4>
    </div>
    

    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Teacher"
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />
      <p className="italic text-gray-300">
        "The assessment and reporting features save us so much time."
      </p>
      <h4 className="mt-4 font-bold text-orange-500">
        Senior Teacher
      </h4>
    </div>

    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <img
        src="https://randomuser.me/api/portraits/women/65.jpg"
        alt="Administrator"
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />
      <p className="italic text-gray-300">
        "A reliable platform for managing academic records."
      </p>
      <h4 className="mt-4 font-bold text-orange-500">
        School Administrator
      </h4>
    </div>

  </div>

  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">

    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="Principal"
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />
      <p className="italic text-gray-300">
        "This system has transformed how we manage student records."
      </p>
      <h4 className="mt-4 font-bold text-orange-500">
        School Principal
      </h4>
    </div>
    

    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Teacher"
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />
      <p className="italic text-gray-300">
        "The assessment and reporting features save us so much time."
      </p>
      <h4 className="mt-4 font-bold text-orange-500">
        Senior Teacher
      </h4>
    </div>

    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <img
        src="https://randomuser.me/api/portraits/women/65.jpg"
        alt="Administrator"
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />
      <p className="italic text-gray-300">
        "A reliable platform for managing academic records."
      </p>
      <h4 className="mt-4 font-bold text-orange-500">
        School Administrator
      </h4>
    </div>

  </div>
</section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-6 bg-gray-900"
      >
        <h2 className="text-center text-4xl font-bold mb-12 text-orange-500">
          Contact Us
        </h2>

        <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded bg-gray-700 text-white"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded bg-gray-700 text-white"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-3 rounded bg-gray-700 text-white"
            ></textarea>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 pt-12 pb-6 px-6">

  <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">

    {/* Project Info */}
    <div>
      <h3 className="text-2xl font-bold text-orange-500 mb-3">
        Ikonex Academy
      </h3>

      <p className="text-gray-400">
        A modern Student Management System designed to
        simplify academic administration, assessments,
        reporting, and student performance tracking.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h4 className="text-lg font-semibold mb-3">
        Quick Links
      </h4>

      <ul className="space-y-2 text-gray-400">
        <li>
          <a href="#home" className="hover:text-orange-500">
            Home
          </a>
        </li>
        <li>
          <a href="#services" className="hover:text-orange-500">
            Services
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-orange-500">
            Contact
          </a>
        </li>
      </ul>
    </div>

    {/* Services */}
    <div>
      <h4 className="text-lg font-semibold mb-3">
        Services
      </h4>

      <ul className="space-y-2 text-gray-400">
        <li>Student Management</li>
        <li>Assessments</li>
        <li>Report Cards</li>
        <li>Performance Tracking</li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h4 className="text-lg font-semibold mb-3">
        Contact Us
      </h4>

      <ul className="space-y-2 text-gray-400">
        <li>Email: info@studentms.com</li>
        <li>Phone: +254 700 000 000</li>
        <li>Nairobi, Kenya</li>
      </ul>
    </div>

  </div>

  <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
    © 2026 Student Management System. All Rights Reserved.
  </div>

</footer>

    </div>
  );
}

export default Home;