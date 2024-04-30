import { useEffect } from "react";
import axios from "axios";

const CartItems = () => {
  useEffect(() => {
    const carticonClickHandler = async () => {
      const userEmail = localStorage.getItem("data.email");
      const url = `http://localhost:3000/api/getCartItems/${userEmail}`;

      try {
        const response = await axios.get(url);
        console.log("response.data", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    carticonClickHandler();
  }, []);

  return <div>cart items page</div>;
};

export default CartItems;
