import { RootState } from "../store/store.js";
import { allShoesTypes } from "../types/allShoesTypes.js";
import { useSelector } from "react-redux";
import { cartItemsTypes } from "../types/cartItemsTypes";
import axios from "axios";

const CartItems = ({ handleGetCartItems }: any) => {
  const cartItems: cartItemsTypes[] = useSelector(
    (state: RootState) => state.cartItems.cartItems,
  );

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

  //for unregistered users
  // const token = localStorage.getItem("authToken");

  const storedCartItems = localStorage.getItem("cartItems") as string;
  const parsedCartItems = JSON.parse(storedCartItems);

  console.log("parsedCartItems", parsedCartItems);

  //for unregistered users
  // const unregisteredUserItems = allShoes.find(
  //   (shoe) => shoe.id === parsedCartItems.itemId,
  // );

  const handleClick = async (id: string) => {
    const userEmail = localStorage.getItem("data.email");

    const url = `http://localhost:3000/api/deleteShoes/${userEmail}/${id}`;

    try {
      const response = await axios.delete(url);
      await handleGetCartItems();
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* {!token ? (  //for unregistered users
        <div className="text-md mb-3 flex gap-3 font-light">
          <img
            className="w-40"
            src={`http://localhost:3000/public/storage/images/${unregisteredUserItems?.image[0]}`}
          />
          <div>
            <h1>size: {parsedCartItems.size}</h1>
            <h1>quantity: {parsedCartItems.quantity}</h1>
            <p>Model: {unregisteredUserItems?.model}</p>
            <p>Color: {unregisteredUserItems?.color}</p>
            <p>Price: ${unregisteredUserItems?.price}</p>
          </div>
        </div>
      ) : ( */}
      <div>
        {cartItems ? (
          <div className="px-5 pt-5 md:grid-cols-2 md:gap-2 xl:mt-20 xl:grid-cols-3 xl:px-20 3xl:px-[400px]">
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
                    <p>Price: ${shoe.price}</p>
                    <div
                      onClick={() => handleClick(item._id)}
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
                <div className="mb-5">total amount: ${totalAmount}</div>
                <button className=" min-w-[150px] whitespace-normal rounded-xl bg-red px-5 py-[6px] text-sm text-white">
                  checkout
                </button>
              </div>
            ) : (
              <div className=" mt-10 flex justify-center">
                <h1>Cart is empty</h1>
              </div>
            )}
          </div>
        ) : (
          <div className=" mt-10 flex justify-center">
            <h1>Cart is empty</h1>
          </div>
        )}
      </div>
      {/* )} */}
    </>
  );
};

export default CartItems;
