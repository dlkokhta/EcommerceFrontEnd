import { useSelector } from "react-redux";
import { RootState } from "../store/store.js";
import { allShoesTypes } from "../types/allShoesTypes.js";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { setCartItems } from "../store/cartItemsSlice";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

const ShoesDetails = () => {
  // const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const allShoes: allShoesTypes[] = useSelector(
    (state: RootState) => state.allShoes.shoes,
  );
  const [selectedShoes, setSelectedShoes] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  // const [unregisteredUserItems, setUnregisteredUserItems] = useState<any>([{}]);
  const [addToCartAlert, setAddToCartAlert] = useState<boolean>(false);

  const shoesById = allShoes.filter((shoes) => shoes.id === id);

  const fetchItems = async () => {
    const userEmail = localStorage.getItem("data.email");
    const url = `https://ecommerceapi-production-7d9c.up.railway.app/getCartItems/${userEmail}`;

    try {
      const response = await axios.get(url);

      dispatch(setCartItems(response.data.cartItems));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (shoesId: string) => {
    const postUrl =
      "https://ecommerceapi-production-7d9c.up.railway.app/api/postCart";
    const token = localStorage.getItem("authToken");
    const userEmail = localStorage.getItem("data.email");

    if (!token) {
      setAddToCartAlert(true);
      setTimeout(() => setAddToCartAlert(false), 4000);
    }

    //for unregistered users
    // if (!token) {
    //   const cartItems = {
    //     itemId: shoesId,
    //     size: selectedSize,
    //     quantity: selectedQuantity,
    //   };

    //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // }

    try {
      await axios.post(
        postUrl,
        {
          email: userEmail,
          cartItems: [
            {
              itemId: shoesId,
              size: selectedSize,
              quantity: selectedQuantity,
            },
          ],
        },

        { headers: { Authorization: `Bearer ${token}` } },
      );

      fetchItems();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      {addToCartAlert && (
        <div className="transition-transform">
          <div
            className=" top-26 fixed right-5 z-50 rounded-lg border border-orange-600 p-4  "
            role="alert"
          >
            <div className="text-center">Please login to add items to cart</div>
          </div>
        </div>
      )}
      <div className="mt-5 px-10 pb-5 pt-5 md:grid-cols-2 md:gap-2 lg:px-60">
        {shoesById.map((shoes) => (
          <div key={shoes.id}>
            <div className="md:flex md:gap-10 lg:gap-20 xl:gap-[100px] ">
              <div className="flex flex-col">
                <div className="mb-2">
                  {shoes.image.slice(0, 1).map((image, index) => (
                    <div key={index}>
                      <img
                        src={`https://ecommerceapi-production-7d9c.up.railway.app/public/storage/images/${selectedShoes || shoes.image[0]}`}
                        alt={image}
                        className="md:max-w-[2440px]"
                      />
                    </div>
                  ))}
                </div>
                <div className=" flex max-w-80 gap-2 xl:w-full">
                  {shoes.image.slice(0, 5).map((image, index) => (
                    <div key={index} onClick={() => setSelectedShoes(image)}>
                      <img
                        src={`https://ecommerceapi-production-7d9c.up.railway.app/public/storage/images/${image}`}
                        alt={image}
                        className={`cursor-pointer border hover:border-green-300 ${selectedShoes === image ? "border-shad border-green-300" : ""}`}
                        onMouseOver={() => setSelectedShoes(image)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-10 font-roboto text-sm font-light">
                <div>
                  <span className="font-normal">Brand: </span>
                  {shoes.brand}
                </div>
                <div className="font-bold">
                  <span className="font-bold">Model: </span>
                  {shoes.model}
                </div>
                <div>
                  <span className="font-normal">Price: </span>${shoes.price}
                </div>
                <div className="mb-3">
                  <span className="font-normal">Color: </span>
                  {shoes.color}
                </div>
                <div className="mb-7 grid cursor-pointer grid-cols-4 gap-1 lg:gap-2">
                  {shoes.sizes.map((size) => (
                    <div
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={` inline-block border-2 text-center ${selectedSize === size ? "bg-slate-500 text-white" : ""}`}
                    >
                      {size}
                    </div>
                  ))}
                </div>

                <div className="mb-4 flex items-center justify-between rounded-full border  font-normal">
                  <div
                    onClick={() => {
                      setSelectedQuantity(selectedQuantity - 1);
                    }}
                    className="rounded-l-full border border-r bg-slate-100 px-5 py-0.5 text-center text-xl  hover:bg-slate-200"
                  >
                    -
                  </div>
                  <h1>Quantity: {selectedQuantity}</h1>
                  <div
                    onClick={() => {
                      setSelectedQuantity(selectedQuantity + 1);
                    }}
                    className="rounded-r-full border border-l bg-slate-100 px-5 py-0.5 text-center text-xl hover:bg-slate-200 "
                  >
                    +
                  </div>
                </div>

                <div className="mb-5 flex flex-col justify-center gap-3 font-normal">
                  <button
                    onClick={() => handleClick(shoes.id)}
                    className=" w-full rounded-full bg-yellow-300 px-5 py-2  text-sm hover:bg-yellow-400"
                  >
                    Add to cart
                  </button>
                  <button className=" w-full rounded-full bg-orange-500 px-5 py-2  text-sm hover:bg-orange-600">
                    Buy now
                  </button>
                </div>

                <h1 className=" font-normal">description</h1>
                <div>{shoes.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ShoesDetails;
