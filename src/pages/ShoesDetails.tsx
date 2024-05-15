import { useSelector } from "react-redux";
import { RootState } from "../store/store.js";
import { allShoesTypes } from "../types/allShoesTypes.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ShoesDetails = ({ onAddToCart }: { onAddToCart: () => void }) => {
  const { id } = useParams();

  console.log("id", id);

  const allShoes: allShoesTypes[] = useSelector(
    (state: RootState) => state.allShoes.shoes,
  );
  const [selectedShoes, setSelectedShoes] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const shoesById = allShoes.filter((shoes) => shoes.id === id);

  const handleClick = async (shoesId: string) => {
    const postUrl = "http://localhost:3000/api/postCart";
    const token = localStorage.getItem("authToken");
    const userEmail = localStorage.getItem("data.email");

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
      onAddToCart();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onAddToCart;
  }, [onAddToCart]);

  // useEffect(() => {
  //   const handleClick = async () => {
  //     const userEmail = localStorage.getItem("data.email");
  //     const url = `http://localhost:3000/api/getCartItems/${userEmail}`;

  //     try {
  //       const response = await axios.get(url);

  //       dispatch(setCartItems(response.data.cartItems));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   handleClick();
  // }, []);

  return (
    <div className="">
      <div className="mt-5 px-10 pb-5 pt-5 md:grid-cols-2 md:gap-2 xl:grid-cols-3 xl:px-20 ">
        {shoesById.map((shoes) => (
          <div key={shoes.id}>
            <div className="md:flex md:gap-10">
              <div className="flex flex-col">
                <div className="mb-2">
                  {shoes.image.slice(0, 1).map((image, index) => (
                    <div key={index}>
                      <img
                        src={`http://localhost:3000/public/storage/images/${selectedShoes || shoes.image[0]}`}
                        alt={image}
                        className="md:max-w-[2440px]"
                      />
                    </div>
                  ))}
                </div>
                <div className=" flex max-w-80 gap-2">
                  {shoes.image.slice(0, 5).map((image, index) => (
                    <div key={index} onClick={() => setSelectedShoes(image)}>
                      <img
                        src={`http://localhost:3000/public/storage/images/${image}`}
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
                <div className="mb-7 grid grid-cols-4 gap-1">
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
