import { useState } from "react";
import axios from "axios";
import { FaSmile, FaFrown, FaAngry } from "react-icons/fa";

function App() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    mood: "Sad",
    severity: "Low"
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://your-backend-url.onrender.com/submit", new URLSearchParams(form), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      setSubmitted(true);
    } catch (err) {
      alert("Submission failed.");
    }
  };

  const MoodIcon = () => {
    switch (form.mood) {
      case "Happy": return <FaSmile className="text-green-500 inline ml-2" />;
      case "Sad": return <FaFrown className="text-blue-500 inline ml-2" />;
      case "Angry": return <FaAngry className="text-red-500 inline ml-2" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-purple-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full animate-fade-in">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">📝 Submit a Grievance</h1>
        {submitted ? (
          <p className="text-green-600 text-center font-semibold">✅ Grievance sent successfully!</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
            />
            <textarea
              name="description"
              placeholder="What's bothering you?"
              rows="4"
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
            />
            <div className="flex items-center gap-3">
              <label className="font-medium text-gray-700">Mood:</label>
              <select name="mood" onChange={handleChange} className="p-2 border rounded-md flex-1">
                <option>Sad</option>
                <option>Happy</option>
                <option>Angry</option>
              </select>
              <MoodIcon />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Severity</label>
              <select name="severity" onChange={handleChange} className="w-full p-2 border rounded-md">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200"
            >
              Submit Grievance
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
