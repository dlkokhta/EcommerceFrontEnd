import "./App.css";
import Home from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import AddShoes from "./pages/AddShoes";
import axios from "axios";
import { useEffect } from "react";
import { setAllShoes } from "./store/allShoesSlice";
import { useDispatch } from "react-redux";
import ShoesDetails from "./pages/ShoesDetails";
import Header from "./components/Header";
import { useLocation } from "react-router-dom";
import CartItems from "./pages/CartItems";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const fetchAllShoes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/getAllShoes",
        );

        dispatch(setAllShoes(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllShoes();
  }, [location.pathname.startsWith("/shoesDetails/")]);

  return (
    <div>
      {location.pathname === "/login" ||
        (location.pathname === "/registration" ? "" : <Header />)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/addShoes" element={<AddShoes />} />
        <Route path="/shoesDetails/:id" element={<ShoesDetails />} />
        <Route path="/cartItems/:email" element={<CartItems />} />
      </Routes>
    </div>
  );
}

export default App;
