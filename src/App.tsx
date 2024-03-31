import "./App.css";
import Home from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import AddShoes from "./pages/AddShoes";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/addShoes" element={<AddShoes />} />
      </Routes>
    </div>
  );
}

export default App;
