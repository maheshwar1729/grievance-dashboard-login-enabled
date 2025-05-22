import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const backendUrl = process.env.REACT_APP_BACKEND_URL?.replace(/\/$/, "");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const params = new URLSearchParams();
    params.append("username", form.username);
    params.append("password", form.password);

    try {
      console.log("Sending request to:", `${backendUrl}/login`);
      const res = await axios.post(`${backendUrl}/login`, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log("Login successful:", res.data);
      localStorage.setItem("token", res.data.access_token);
      onLogin();
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
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
            required
            placeholder="Username"
            className="w-full p-2 border rounded-md"
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full p-2 border rounded-md"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md font-bold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
