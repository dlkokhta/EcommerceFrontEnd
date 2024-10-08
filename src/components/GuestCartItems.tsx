import { RootState } from "../store/store.js";
import { allShoesTypes } from "../types/allShoesTypes.js";
import { useSelector } from "react-redux";
import { cartItemsTypes } from "../types/cartItemsTypes";

interface GuestCartItemsTypes {
  url: string;
  buyClickHandler: any;
  handleClick: any;
}

const GuestCartItems: React.FC<GuestCartItemsTypes> = ({
  url,
  buyClickHandler,
  handleClick,
}) => {
  const cartItems: cartItemsTypes[] = useSelector(
    (state: RootState) => state.cartItems.cartItems,
  );

  //guest
  const updatedGuestCartItems: Array<{
    itemId: string;
    size: string;
    quantity: number;
    _id: string;
  }> = JSON.parse(localStorage.getItem("guestCart") || "[]");

  const allShoes: allShoesTypes[] = useSelector(
    (state: RootState) => state.allShoes.shoes,
  );

  //guest
  const guestTotalAmount = cartItems
    ? updatedGuestCartItems.reduce((total, item) => {
        const shoe = allShoes.find((shoe) => shoe.id === item.itemId);
        if (!shoe) {
          return total;
        }
        return total + item.quantity * shoe.price;
      }, 0)
    : 0;

  const guestRoundedTotalAmount = guestTotalAmount.toFixed(2);

  return (
    <div className="px-5 pt-5 md:grid-cols-2 md:gap-2 xl:mt-20 xl:grid-cols-3 xl:px-20 3xl:px-[400px]">
      {updatedGuestCartItems.map((item, index) => {
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
                onClick={() => handleClick(item.itemId, item.size)}
                className="mt-2 cursor-pointer text-red"
              >
                Remove
              </div>
            </div>
          </div>
        );
      })}
      {guestTotalAmount ? (
        <div className="flex flex-col items-center justify-center pb-10">
          <div className="mb-5">total amount: ${guestRoundedTotalAmount}</div>
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
  );
};

export default GuestCartItems;
