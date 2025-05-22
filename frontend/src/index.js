import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./Login";
import "./index.css";

const Root = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  return loggedIn ? <App /> : <Login onLogin={() => setLoggedIn(true)} />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
