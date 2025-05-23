import React, { useState } from "react";

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.username === "admin" && form.password === "admin123") {
      onLogin();
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-pink-700">🔐 Login</h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="username" placeholder="Username" onChange={handleChange} required className="w-full p-3 border rounded-md" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-3 border rounded-md" />
          <button type="submit" className="w-full py-2 rounded-md bg-pink-600 text-white font-semibold hover:bg-pink-700">
            Login 💖
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
