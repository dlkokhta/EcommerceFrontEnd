import "./App.css";
import Home from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import axios from "axios";
import { useEffect } from "react";
import { setAllShoes } from "./store/allShoesSlice";
import { useDispatch } from "react-redux";
import ShoesDetails from "./pages/ShoesDetails";
import Header from "./components/Header";
import { useLocation } from "react-router-dom";
import CartItems from "./pages/CartItems";
import { setCartItems } from "./store/cartItemsSlice";
import { useState } from "react";
import AdminPanel from "./pages/adminPanel";
import UserVerify from "./components/UserVerify";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage";
import OTPPage from "./pages/OTPPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import PurchasedPage from "./pages/PurchasedPage";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  let url;
  if (process.env.NODE_ENV === "production") {
    url = `https://ecommerceapi-production-7d9c.up.railway.app/api`;
  } else {
    url = `http://localhost:3000/api`;
  }
  const [update, setUpdate] = useState(false);

  const updateAllShoesForAdmin = async () => {
    setUpdate((prevUpdate) => !prevUpdate);
  };

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
  }, [update]);

  const handleGetCartItems = async () => {
    const userEmail = localStorage.getItem("data.email");

    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(`${url}/getCartItems/${userEmail}`, {
        headers: { Authorization: `Bearer ${token}`, Email: userEmail },
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

  return (
    <div>
      {location.pathname !== "/login" &&
        location.pathname !== "/adminLogin" &&
        location.pathname !== "/adminPanel" &&
        location.pathname !== "/addItem" &&
        location.pathname !== "/passwordRecovery" &&
        location.pathname !== "/OTP" &&
        location.pathname !== "/resetPassword" &&
        location.pathname !== "/purchasedPage" &&
        location.pathname !== "/registration" && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/shoesDetails/:id" element={<ShoesDetails />} />
        {localStorage.getItem("role") === "admin" &&
          localStorage.getItem("authToken") && (
            <Route
              path="/adminPanel"
              element={
                <AdminPanel updateAllShoesForAdmin={updateAllShoesForAdmin} />
              }
            />
          )}
        <Route
          path="/cartItems/:email"
          element={<CartItems handleGetCartItems={handleGetCartItems} />}
        />
        <Route path="/verify" element={<UserVerify />} />
        <Route path="/passwordRecovery" element={<PasswordRecoveryPage />} />
        <Route path="/OTP" element={<OTPPage />} />
        <Route path="/resetPassword" element={<PasswordResetPage />} />
        <Route path="/purchased" element={<PurchasedPage />} />
      </Routes>
    </div>
  );
}

export default App;
