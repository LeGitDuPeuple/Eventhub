import { Routes, Route, Navigate } from "react-router-dom";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Profile } from "./components/Profil";
import "./styles/login.css";
import "./styles/register.css";
import "./styles/login.css"


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
