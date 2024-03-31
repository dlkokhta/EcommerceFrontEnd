import "./App.css";
import Home from "./pages/Home.js";
import { Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration.js";
import Login from "./pages/Login.js";
import AddShoes from "./pages/AddShoes.js";

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
