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
// import AdminLogin from "./pages/adminLogin";
import AdminPanel from "./pages/adminPanel";
function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  let url;

  if (process.env.NODE_ENV === "production") {
    url = `https://ecommerceapi-production-7d9c.up.railway.app/api`;
  } else {
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

    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(`${url}/getCartItems/${userEmail}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
  console.log("user role", localStorage.getItem("role"));
  return (
    <div>
      {location.pathname !== "/login" &&
        location.pathname !== "/adminLogin" &&
        location.pathname !== "/adminPanel" &&
        location.pathname !== "/addItem" &&
        location.pathname !== "/registration" && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        {localStorage.getItem("role") === "admin" && (
          <Route path="/addItem" element={<AddShoes />} />
        )}
        <Route path="/shoesDetails/:id" element={<ShoesDetails />} />
        {/* <Route path="/adminLogin" element={<AdminLogin />} /> */}
        {localStorage.getItem("role") === "admin" && (
          <Route path="/adminPanel" element={<AdminPanel />} />
        )}
        <Route
          path="/cartItems/:email"
          element={<CartItems handleGetCartItems={handleGetCartItems} />}
        />
      </Routes>
    </div>
  );
}

export default App;
