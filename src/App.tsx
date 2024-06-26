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
import { setCartItems } from "./store/cartItemsSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  let url;

  if (process.env.NODE_ENV === "production") {
    // Use production backend URL
    url = `https://ecommerceapi-production-7d9c.up.railway.app/api`;
  } else {
    // Use local backend URL
    url = `http://localhost:3000/api`;
  }

  useEffect(() => {
    const fetchAllShoes = async () => {
      try {
        const response = await axios.get(`${url}/getAllShoes`);

        dispatch(setAllShoes(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllShoes();
  }, []);

  const handleGetCartItems = async () => {
    const userEmail = localStorage.getItem("data.email");

    // const url = `http://localhost:3000/api/getCartItems/${userEmail}`;

    try {
      const response = await axios.get(`${url}/getCartItems/${userEmail}`);

      dispatch(setCartItems(response.data.cartItems));
      // const itemsQuantity = response.data.cartItems.length;
      // localStorage.setItem("itemsQuantity", itemsQuantity);
    } catch (error) {
      console.log(error);
    }
  };

  handleGetCartItems();

  // console.log("data.email", localStorage.getItem("data.email"));
  // if (localStorage.getItem("data.email")) {
  // }
  // handleGetCartItems();

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
        <Route
          path="/cartItems/:email"
          element={<CartItems handleGetCartItems={handleGetCartItems} />}
        />
      </Routes>
    </div>
  );
}

export default App;
