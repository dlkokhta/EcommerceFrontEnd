import axios from "axios";
import { useEffect, useState } from "react";
import { RootState } from "../store/store.js";
import { allShoesTypes } from "../types/allShoesTypes.js";
import { useSelector } from "react-redux";

interface PurchasedItem {
  id: string;
  name: string;
  quantity: number;
}

const PurchasedPage = () => {
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([]);

  const allShoes: allShoesTypes[] = useSelector(
    (state: RootState) => state.allShoes.shoes,
  );

  let url;
  if (process.env.NODE_ENV === "production") {
    url = `https://ecommerceapi-production-7d9c.up.railway.app`;
  } else {
    url = `http://localhost:3000`;
  }

  useEffect(() => {
    const purchasedShoes = async () => {
      const email = localStorage.getItem("data.email");
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(`${url}/api/purchaseGet/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPurchasedItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    purchasedShoes();
  }, [url]);

  return (
    <>
      <div className="mt-24">
        <h1 className="text-center">Purchased Shoes</h1>
        {purchasedItems ? (
          <div className="px-5 pt-5 md:grid-cols-2 md:gap-2 xl:mt-20 xl:grid-cols-3 xl:px-20 3xl:px-[400px]">
            {purchasedItems.map((item: any) =>
              item.cartItems.map((cartItem: any) => {
                const shoe = allShoes.find(
                  (shoe) => shoe.id === cartItem.itemId,
                );

                if (!shoe) {
                  return null;
                }

                return (
                  <div
                    key={cartItem.itemId}
                    className="text-md mb-3 flex gap-3 font-light"
                  >
                    <div>
                      <img
                        className="w-40"
                        src={`${url}/public/storage/images/${shoe.image[0]}`}
                        alt={shoe.model}
                      />
                    </div>

                    <div>
                      <h1>Size: {cartItem.size}</h1>
                      <h1>Quantity: {cartItem.quantity}</h1>
                      <p>Model: {shoe.model}</p>
                      <p>Color: {shoe.color}</p>
                      <p>Price: ${shoe.price}</p>
                    </div>
                  </div>
                );
              }),
            )}
          </div>
        ) : (
          <div className="mt-10 flex justify-center">
            <h1>No purchased shoes</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default PurchasedPage;
