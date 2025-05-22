import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear old error
    try {
      const baseURL = process.env.REACT_APP_BACKEND_URL.replace(/\/$/, ""); // remove trailing slash if any
      const params = new URLSearchParams(form);

      const res = await axios.post(`${baseURL}/login`, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      localStorage.setItem("token", res.data.access_token);
      onLogin();
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-6">🔐 Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            onChange={handleChange}
            value={form.username}
            required
            placeholder="Username"
            className="w-full p-2 border rounded-md"
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={form.password}
            required
            placeholder="Password"
            className="w-full p-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
