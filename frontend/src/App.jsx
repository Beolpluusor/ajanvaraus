import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Calendar from "./pages/Calendar";
import Main from "./pages/Home";
import Register from "./pages/Register";
import "./app.css";

export default function App() {
 
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Calendar" element={<Calendar />} />
      <Route path="/Home" element={<Main />} />
      <Route path="/Register" element={<Register />} />
    </Routes>
  );
}
