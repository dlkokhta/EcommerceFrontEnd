import { RootState } from "../store/store.js";
import { allShoesTypes } from "../types/allShoesTypes.js";
import { useSelector } from "react-redux";
import { cartItemsTypes } from "../types/cartItemsTypes";
import axios from "axios";
import { useState } from "react";
import { setrenderHeader } from "../store/headerRenderSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import SuccessMessage from "../components/SuccessMessage";
import GuestCartItems from "../components/GuestCartItems";

const CartItems = ({ handleGetCartItems }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState(false);

  const cartItems: cartItemsTypes[] = useSelector(
    (state: RootState) => state.cartItems.cartItems,
  );
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const allShoes: allShoesTypes[] = useSelector(
    (state: RootState) => state.allShoes.shoes,
  );

  const totalAmount = cartItems
    ? cartItems.reduce((total, item) => {
        const shoe = allShoes.find((shoe) => shoe.id === item.itemId);
        if (!shoe) {
          return total;
        }
        return total + item.quantity * shoe.price;
      }, 0)
    : 0;

  //guest
  const updatedGuestCartItems: Array<{
    itemId: string;
    size: string;
    quantity: number;
    _id: string;
  }> = JSON.parse(localStorage.getItem("guestCart") || "[]");

  const roundedTotalAmount = totalAmount.toFixed(2);

  let url;
  if (process.env.NODE_ENV === "production") {
    url = `https://dimitrikokhtashvili.site`;
  } else {
    url = `http://localhost:3000`;
  }

  const handleClick = async (id: string, size: string) => {
    console.log("guest shoes id and size", id, size);
    setLoading(true);
    //guest
    if (!token) {
      //guest
      dispatch(setrenderHeader(true));

      //guest
      const storedGuestCartItems = JSON.parse(
        localStorage.getItem("guestCart") || "[]",
      );

      const updatedGuestCartItems = storedGuestCartItems.filter(
        (item: { itemId: string; size: string }) =>
          !(item.itemId === id && item.size === size),
      );

      localStorage.setItem("guestCart", JSON.stringify(updatedGuestCartItems));
    }

    const userEmail = localStorage.getItem("data.email");

    try {
      await axios.delete(`${url}/api/deleteShoes/${userEmail}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await handleGetCartItems();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const buyClickHandler = async () => {
    if (!token) {
      console.log("clickedddddd!");
      navigate("/registration");
      return;
    }
    setSuccess(true);
    const userEmail = localStorage.getItem("data.email");

    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      quantity: item.quantity.toString(),
    }));

    const payload = {
      email: userEmail,
      cartItems: updatedCartItems,
      totalAmount: roundedTotalAmount,
    };

    try {
      await axios.post(`${url}/api/purchased`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      handleGetCartItems();
    } catch (error) {
      console.log(error);
    }

    navigate("/");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <>
      <div className="mt-24">
        {loading && <LoadingSpinner />}
        {success && <SuccessMessage message="Your purchase was successful!" />}
        {cartItems && token ? (
          <div className="px-5 pt-5 md:grid-cols-2 md:gap-2 xl:mt-20 xl:grid-cols-3 xl:px-20 3xl:px-[400px]">
            {cartItems.map((item, index) => {
              const shoe = allShoes.find((shoe) => shoe.id === item.itemId);

              if (!shoe) {
                return null;
              }

              return (
                <div key={index} className="text-md mb-3 flex gap-3 font-light">
                  <div>
                    <img
                      className="w-40"
                      src={`${url}/public/storage/images/${shoe.image[0]}`}
                      alt={shoe.model}
                    />
                  </div>

                  <div>
                    <h1>size: {item.size}</h1>
                    <h1>quantity: {item.quantity}</h1>
                    <p>Model: {shoe.model}</p>
                    <p>Color: {shoe.color}</p>
                    <p>Price: ${shoe.price}</p>
                    <div
                      onClick={() => handleClick(item._id, item.size)}
                      className="mt-2 cursor-pointer text-red"
                    >
                      Remove
                    </div>
                  </div>
                </div>
              );
            })}
            {totalAmount ? (
              <div className="flex flex-col items-center justify-center pb-10">
                <div className="mb-5">total amount: ${roundedTotalAmount}</div>
                <button
                  onClick={buyClickHandler}
                  className=" min-w-[150px] whitespace-normal rounded-full bg-red px-5 py-[6px] text-sm text-white hover:bg-orange-600"
                >
                  Buy
                </button>
              </div>
            ) : (
              <div className=" mt-10 flex justify-center">
                <h1>Cart is empty</h1>
              </div>
            )}
          </div>
        ) : //guest
        updatedGuestCartItems && !token ? (
          <GuestCartItems
            url={url}
            buyClickHandler={buyClickHandler}
            handleClick={handleClick}
          />
        ) : (
          <div className=" mt-10 flex justify-center">
            <h1>Cart is empty</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default CartItems;
