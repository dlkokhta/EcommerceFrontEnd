import { useSelector } from "react-redux";
import { RootState } from "../store/store.js";
import { allShoesTypes } from "../types/allShoesTypes.js";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { setCartItems } from "../store/cartItemsSlice";
import { setrenderHeader } from "../store/headerRenderSlice.js";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";

interface CartItem {
  itemId: string;
  size: string;
  quantity: number;
  _id: string;
}

const ShoesDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const allShoes: allShoesTypes[] = useSelector(
    (state: RootState) => state.allShoes.shoes,
  );

  const [selectedShoes, setSelectedShoes] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isSizeSelected, setIsSizeSelected] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [displayError, setDisplayError] = useState<boolean>(false);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [cartItemQuantity, setCartItemQuantity] = useState<number>(0); //real quantity from database
  const [cartItemId, setCartItemId] = useState<string>(""); //this shows me shoes id on the size click
  const [cartItemsFromResponse, setCartItemsFromResponse] = useState<
    CartItem[]
  >([]);
  const [showQuantityError, setShowQuantityError] = useState<boolean>(false);
  const [guestExistingShoesQuantity, setGuestExistingShoesQuantity] =
    useState(0);

  const findCartItemId: CartItem | undefined = cartItemsFromResponse //cart items from response, from ocartitem database
    .filter((item: CartItem) => item.itemId === cartItemId)
    .find((item: CartItem) => item.size === selectedSize);

  const findCartItemQuantityFromDatabase = findCartItemId // there is concrate size quantity from cart item , it shows quantity by select size and item id
    ? findCartItemId.quantity
    : 0;
  const token = localStorage.getItem("authToken");

  const concrateItemSizeQuantity =
    cartItemQuantity - findCartItemQuantityFromDatabase;

  //guest
  if (!token) {
    const updatedGuestCartItems = JSON.parse(
      localStorage.getItem("guestCart") || "[]",
    );

    const findCartItemId = updatedGuestCartItems
      .filter((item: any) => item.itemId === cartItemId)
      .find((item: any) => item.size === selectedSize);

    const findCartItemQuantityFromDatabase = findCartItemId
      ? findCartItemId.quantity
      : 0;

    const concrateItemSizeQuantity =
      cartItemQuantity - findCartItemQuantityFromDatabase;

    useEffect(() => {
      if (selectedQuantity > concrateItemSizeQuantity) {
        if (concrateItemSizeQuantity >= 0) {
          // setShowQuantityError(true);
          dispatch(setrenderHeader(false));
          setGuestExistingShoesQuantity(concrateItemSizeQuantity);
          setTimeout(() => setShowQuantityError(false), 2000);
        }
        return;
      }
    }, [selectedQuantity, concrateItemSizeQuantity]);
  }

  const shoesById = allShoes.filter((shoes) => shoes.id === id);

  let url;

  if (process.env.NODE_ENV === "production") {
    url = `https://api.shop.dimitrikokhtashvili.com/api`;
  } else {
    url = `http://localhost:3000`;
  }

  const fetchItems = async () => {
    const userEmail = localStorage.getItem("data.email");
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(`${url}/api/getCartItems/${userEmail}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      dispatch(setCartItems(response.data.cartItems));
      setCartItemsFromResponse(response.data.cartItems);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (shoesId: string) => {
    dispatch(setrenderHeader(true));
    const postUrl = `${url}/api/postCart`;
    const token = localStorage.getItem("authToken");
    const userEmail = localStorage.getItem("data.email");
    setDisplayError(false);

    if (token && !selectedSize) {
      setIsSizeSelected(true);
      setTimeout(() => setIsSizeSelected(false), 4000);
    }

    //guest
    if (!token) {
      const updatedGuestCartItems = JSON.parse(
        localStorage.getItem("guestCart") || "[]",
      );

      const findCartItemId = updatedGuestCartItems
        .filter((item: any) => item.itemId === shoesId)
        .find((item: any) => item.size === selectedSize);

      const findCartItemQuantityFromDatabase = findCartItemId
        ? findCartItemId.quantity
        : 0;

      const concrateItemSizeQuantity =
        cartItemQuantity - findCartItemQuantityFromDatabase;

      if (selectedQuantity > concrateItemSizeQuantity) {
        setShowQuantityError(true);
        dispatch(setrenderHeader(false));
        setGuestExistingShoesQuantity(concrateItemSizeQuantity);
        setTimeout(() => setShowQuantityError(false), 2000);
        return;
      }

      let guestCartItems = JSON.parse(
        localStorage.getItem("guestCart") || "[]",
      );

      const newCartItem = {
        itemId: shoesId,
        size: selectedSize,
        quantity: selectedQuantity,
      };

      const existingItemIndex = guestCartItems.findIndex(
        (item: any) => item.itemId === shoesId && item.size === selectedSize,
      );

      if (existingItemIndex !== -1) {
        guestCartItems[existingItemIndex].quantity += selectedQuantity;
      } else {
        guestCartItems = [...guestCartItems, newCartItem];
      }

      localStorage.setItem("guestCart", JSON.stringify(guestCartItems));
    }

    if (selectedQuantity > concrateItemSizeQuantity) {
      if (concrateItemSizeQuantity >= 0) {
        setShowQuantityError(true);
        setTimeout(() => setShowQuantityError(false), 2000);
      }

      return;
    }

    if (token && !displayError) {
      setDisplayError(true);
      setTimeout(() => setDisplayError(false), 2000);
    }

    setLoading(true);

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
        { 
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        },
      );

      fetchItems();
    } catch (error: any) {
      const { message, findQuantityToNumber } = error.response.data;
      setErrorMessage(`${message} ${findQuantityToNumber}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative mt-24">
      {loading && <LoadingSpinner />}
      <div className="mt-5 px-10 pb-5 pt-5 sm:px-28 lg:px-20 xl:px-40 2xl:px-[250px] 3xl:px-[420px]">
        {shoesById.map((shoes) => (
          <div key={shoes.id}>
            <div className="lg:flex md:gap-10 lg:gap-20 xl:gap-[100px] ">
              <div className="flex flex-col">
                <div className="mb-2">
                  {shoes.image.slice(0, 1).map((image, index) => (
                    <div key={index}>
                      <img
                        src={`${url}/public/storage/images/${selectedShoes || shoes.image[0]}`}
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
                        src={`${url}/public/storage/images/${image}`}
                        alt={image}
                        className={`cursor-pointer border hover:border-green-300 ${selectedShoes === image ? "border-shad border-green-300" : ""} duration-400 transition hover:-translate-y-2`}
                        onMouseOver={() => setSelectedShoes(image)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mb-10 font-roboto text-sm font-light">
                <div>
                  <span className="font-normal"></span>
                  {shoes.gender}
                </div>
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
                <div className="hower:bg-red mb-7 grid cursor-pointer grid-cols-4 gap-1 lg:gap-2">
                  {shoes.sizes.map((item: any) => (
                    <div
                      key={item.size}
                      onClick={() => {
                        item.quantity > 0 && setSelectedSize(item.size);
                        setCartItemQuantity(Number(item.quantity));
                        setCartItemId(shoes.id);
                        item.quantity > 0 && setLoading(true);
                        setTimeout(() => setLoading(false), 500);
                      }}
                      className={`inline-block border-2 text-center ${
                        selectedSize === item.size
                          ? "bg-slate-500 text-white"
                          : item.quantity > 0
                            ? "cursor-pointer hover:border-green-300"
                            : "crossed-out disabled:focus: cursor-not-allowed bg-slate-100"
                      }`}
                    >
                      {item.size}
                    </div>
                  ))}
                </div>
                <div className=" flex items-center justify-between rounded-full border font-normal">
                  <div
                    onClick={() => {
                      selectedQuantity === 1
                        ? setSelectedQuantity(1)
                        : setSelectedQuantity(selectedQuantity - 1);
                    }}
                    className="cursor-pointer rounded-l-full border border-r bg-slate-100 px-5 py-0.5 text-center  text-xl hover:bg-slate-200"
                  >
                    -
                  </div>
                  <h1>Quantity: {selectedQuantity}</h1>
                  <div
                    onClick={() => {
                      selectedQuantity === 10
                        ? setSelectedQuantity(10)
                        : setSelectedQuantity(selectedQuantity + 1);
                    }}
                    className="cursor-pointer rounded-r-full border border-l bg-slate-100 px-5 py-0.5 text-center text-xl hover:bg-slate-200 "
                  >
                    +
                  </div>
                </div>
                <div className="md:text-medium text-medium flex h-8 items-center justify-center">
                  {isSizeSelected ? (
                    <h2 className=" text-red" role="alert">
                      <div className="">please select size</div>
                    </h2>
                  ) : displayError ? (
                    <h2 className=" text-red" role="alert">
                      <div className="">{errorMessage}</div>
                    </h2>
                  ) : showQuantityError ? (
                    <h2 className=" text-red" role="alert">
                      <div className="">
                        {`available only ${token ? concrateItemSizeQuantity : guestExistingShoesQuantity}`}
                      </div>
                    </h2>
                  ) : null}
                </div>

                <div className="mb-5 flex flex-col justify-center gap-5 font-normal">
                  <button
                    onClick={() => handleClick(shoes.id)}
                    className=" w-full rounded-full bg-yellow-300 px-5 py-2  text-sm hover:bg-yellow-400"
                    disabled={loading}
                  >
                    Add to cart
                  </button>
                  {/* <button className=" w-full rounded-full bg-orange-500 px-5 py-2  text-sm hover:bg-orange-600">
                    Buy now
                  </button> */}
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
