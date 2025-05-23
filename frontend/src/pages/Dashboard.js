import React, { useState } from "react";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Dashboard({ onLogout }) {
  const [form, setForm] = useState({ title: "", description: "", mood: "", severity: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.mood || !form.severity) {
      setError("Please fill in all fields.");
      return;
    }

    const formData = new URLSearchParams();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });
      setLoading(false);
      if (!response.ok) throw new Error("Failed to submit grievance");
      setSuccess(true);
      setForm({ title: "", description: "", mood: "", severity: "" });
    } catch (err) {
      setLoading(false);
      setError("Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Princess Ushmita Grievance 🥀</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange}
            className="w-full p-3 border border-pink-300 rounded-md" required />
          <textarea name="description" placeholder="What's bothering you?" value={form.description} onChange={handleChange}
            rows="4" className="w-full p-3 border border-pink-300 rounded-md resize-none" required />
          <select name="mood" value={form.mood} onChange={handleChange}
            className="w-full p-3 border border-pink-300 rounded-md" required>
            <option value="">Mood</option>
            <option>😘</option><option>🤒</option><option>🤗</option><option>💐</option>
            <option>😢</option><option>😠</option><option>😂</option><option>💖</option>
          </select>
          <select name="severity" value={form.severity} onChange={handleChange}
            className="w-full p-3 border border-pink-300 rounded-md" required>
            <option value="">Severity</option>
            <option>Need more flowers 💐</option>
            <option>I want to do nakhra/drama</option>
            <option>I am on periods with lot of pain 😢</option>
            <option>I want to do more shopping 💖</option> 
            <option>Need lot of love, kisses and hugs 💕😘🤗</option>
            <option>I wish you are here with me 😢🤗</option>
            <option>Now I became dark circle panda 🐼</option>
            <option>I need money 🤗</option>
            <option>Surprise me 💞🤗</option>
            <option>Good Morning 💕😘🤗</option>
            <option>Good Night, Sleep well, Sweet dreams, take care 💕😘🤗</option>
            <option>Take care 💕😘🤗</option>
            <option>Lets go to Temple 💕😘🤗</option>
            <option>Have a Nice day 💕😘🤗</option>
            <option>Stay Strong and be Happy always, Smile please 💕😘🤗</option>
            <option>I'm hungry 🍲</option>
            <option>I am Angry 😠</option>
            <option>I love you 💖</option>
            <option>I'm too lazy and sleepy 😴</option>
            <option>Let's travel together 🏍️</option>
            <option>Missing you a lot 💞🤗</option>
          </select>
          <button type="submit"
            className="w-full py-3 rounded-md text-white font-bold transition disabled:opacity-60 bg-pink-500 hover:bg-pink-600 disabled:cursor-not-allowed"
            disabled={loading}>
            {loading ? "Submitting..." : "Submit 💌"}
          </button>
          {success && <p className="text-green-600 text-center font-semibold">✅ Grievance submitted successfully!</p>}
          {error && <p className="text-red-600 text-center font-medium">{error}</p>}
        </form>
        <button onClick={onLogout} className="mt-6 block mx-auto text-sm text-pink-600 underline">
          Logout 🚪
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
