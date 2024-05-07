import { useEffect } from "react";
import axios from "axios";

import { RootState } from "../store/store.js";
import { allShoesTypes } from "../types/allShoesTypes.js";
import { useSelector } from "react-redux";
import { cartItemsTypes } from "../types/cartItemsTypes";
import { setCartItems } from "../store/cartItemsSlice";
import { useDispatch } from "react-redux";

const CartItems = () => {
  const dispatch = useDispatch();

  const cartItems: cartItemsTypes[] = useSelector(
    (state: RootState) => state.cartItems.cartItems,
  );

  const allShoes: allShoesTypes[] = useSelector(
    (state: RootState) => state.allShoes.shoes,
  );

  useEffect(() => {
    const carticonClickHandler = async () => {
      const userEmail = localStorage.getItem("data.email");
      const url = `http://localhost:3000/api/getCartItems/${userEmail}`;

      try {
        const response = await axios.get(url);

        dispatch(setCartItems(response.data.cartItems));
      } catch (error) {
        console.log(error);
      }
    };
    carticonClickHandler();
  }, []);

  return (
    <div>
      <div className="px-5 pt-5 md:grid-cols-2 md:gap-2 xl:grid-cols-3 xl:px-20">
        {cartItems.map((item, index) => {
          // Find the corresponding shoe in allShoes based on itemId
          const shoe = allShoes.find((shoe) => shoe.id === item.itemId);

          if (!shoe) {
            // If no matching shoe found, return null or handle the case as needed
            return null;
          }

          return (
            <div key={index} className="text-md mb-3 flex gap-3 font-light">
              <div>
                <img
                  className="w-40"
                  src={`http://localhost:3000/public/storage/images/${shoe.image[0]}`}
                  alt={shoe.model}
                />
              </div>

              <div>
                <h1>size: {item.size}</h1>
                <h1>quantity: {item.quantity}</h1>
                <p>Model: {shoe.model}</p>
                <p>Color: {shoe.color}</p>
                <p>Price: {shoe.price}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <button className=" min-w-[150px] whitespace-normal rounded-xl bg-red px-5 py-[6px] text-sm text-white">
          checkout
        </button>
      </div>
    </div>
  );
};
export default CartItems;
