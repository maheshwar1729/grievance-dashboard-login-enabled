import React, { useState } from "react";

function Dashboard({ onLogout }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    mood: "",
    severity: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(form, null, 2));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Submit a Grievance 🥀</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange}
            className="w-full p-3 border border-pink-300 rounded-md" required />
          <textarea name="description" placeholder="What's bothering you?" value={form.description} onChange={handleChange}
            rows="4" className="w-full p-3 border border-pink-300 rounded-md resize-none" required />
          <select name="mood" value={form.mood} onChange={handleChange}
            className="w-full p-3 border border-pink-300 rounded-md">
            <option value="">Mood</option>
            <option>😘</option><option>🤒</option><option>🤗</option><option>💐</option>
            <option>😢</option><option>😠</option><option>😂</option><option>💖</option>
          </select>
          <select name="severity" value={form.severity} onChange={handleChange}
            className="w-full p-3 border border-pink-300 rounded-md">
            <option value="">Severity</option>
            <option>Need more flowers 💐</option>
            <option>Need lot of love, kisses and hugs 💕😘🤗</option>
            <option>I wish you are here with me 😢🤗</option>
            <option>Now I became dark circle panda 🐼</option>
            <option>I'm hungry 🍲</option>
            <option>Angry 😠</option>
            <option>I love you 💖</option>
            <option>I'm lazy and sleepy 😴</option>
            <option>Let's travel together 🏍️</option>
            <option>Missing you a lot 💞🤗</option>
          </select>
          <button type="submit" className="w-full py-3 rounded-md bg-pink-500 text-white font-bold hover:bg-pink-600 transition">
            Submit 💌
          </button>
        </form>
        <button onClick={onLogout} className="mt-6 block mx-auto text-sm text-pink-600 underline">
          Logout 🚪
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
