import hamburher from "../assets/hamburger.svg";
import close from "../assets/close.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cartIcon from "../assets/shoppingCart.png";
import searchicon from "../assets/search.svg";
import { RootState } from "../store/store.js";
import { cartItemsTypes } from "../types/cartItemsTypes";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";

const Header = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState<Boolean>(false);
  const [destMenu, setDestMenu] = useState<string>("");
  const navigate = useNavigate();

  const cartItems: cartItemsTypes[] = useSelector(
    (state: RootState) => state.cartItems.cartItems || [],
  );

  const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleClick = (path: string) => {
    navigate(path);
  };
  const token = localStorage.getItem("authToken");
  const name = localStorage.getItem("userName");

  const logOutClickhandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("data.email");
    navigate("/login");
  };

  const [manHovered, setManHovered] = useState(false);
  const [womanHovered, setWomanHovered] = useState(false);
  const [newHovered, setNewHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  // const [contactHovered, setContactHovered] = useState(false);
  const [brandHovered, setBrandHovered] = useState(false);

  const cartIconClickhandler = () => {
    navigate("/cartItems/{email}");
  };

  return (
    <>
      <div className="relative mb-5">
        {manHovered && (
          <div className="absolute top-16 min-h-screen w-full bg-black/40">
            <div>
              <div className="bg-white pb-20 pl-10 pt-20">
                <div className="">Shoes</div>
                <div className="">Clothes</div>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center gap-3 px-5 pt-5 lg:px-10">
          <img
            className="h-5 lg:hidden"
            onClick={() => {
              setHamburgerOpen(true);
            }}
            src={hamburher}
            alt="hamburger"
          />
          <img
            className="hidden w-16 cursor-pointer lg:block"
            src={logo}
            onClick={() => navigate("/")}
          />
          {/* <h1
            onClick={() => navigate("/")}
            className="hidden cursor-pointer font-roboto font-medium lg:block"
          >
            eCommerce
          </h1> */}

          <div className="ml-10 mt-1 hidden font-roboto font-light lg:block ">
            <div className="items flex flex-row gap-2 lg:text-sm xl:gap-6">
              <div
                onMouseEnter={() => setNewHovered(true)}
                onMouseLeave={() => setNewHovered(false)}
                className=" cursor-pointer"
                onClick={() => {
                  setDestMenu("New");
                }}
              >
                New
                {destMenu === "New" ? (
                  <div className="w-f h-[2px] bg-yellow-300"></div>
                ) : (
                  <div
                    className={`w-f h-[2px] ${newHovered ? "bg-slate-300" : ""}`}
                  ></div>
                )}
              </div>
              <div
                onMouseEnter={() => setManHovered(true)}
                onMouseLeave={() => setManHovered(false)}
                className=" cursor-pointer items-center"
                onClick={() => {
                  setDestMenu("Man");
                }}
              >
                Man
                {destMenu === "Man" ? (
                  <div className="w-f h-[2px] bg-yellow-300"></div>
                ) : (
                  <div
                    className={`w-f h-[2px] ${manHovered ? "bg-slate-300" : ""}`}
                  ></div>
                )}
              </div>

              <div
                onMouseEnter={() => setWomanHovered(true)}
                onMouseLeave={() => setWomanHovered(false)}
                className=" cursor-pointer"
                onClick={() => {
                  setDestMenu("Women");
                }}
              >
                Woman
                {destMenu === "Women" ? (
                  <div className="w-f h-[2px] bg-yellow-300"></div>
                ) : (
                  <div
                    className={`w-f h-[2px] ${womanHovered ? "bg-slate-300" : ""}`}
                  ></div>
                )}
              </div>

              <div
                onMouseEnter={() => setBrandHovered(true)}
                onMouseLeave={() => setBrandHovered(false)}
                className=" cursor-pointer"
                onClick={() => {
                  setDestMenu("Brand");
                }}
              >
                Brand
                {destMenu === "Brand" ? (
                  <div className="w-f h-[2px] bg-yellow-300"></div>
                ) : (
                  <div
                    className={`w-f h-[2px] ${brandHovered ? "bg-slate-300" : ""}`}
                  ></div>
                )}
              </div>

              <div
                onMouseEnter={() => setAboutHovered(true)}
                onMouseLeave={() => setAboutHovered(false)}
                className=" cursor-pointer"
                onClick={() => {
                  setDestMenu("About");
                  navigate("/");
                  setTimeout(() => {
                    window.scrollTo({
                      top: document.documentElement.scrollHeight,
                      behavior: "smooth",
                    });
                  }, 100);
                }}
              >
                About
                {destMenu === "About" ? (
                  <div className="w-f h-[2px] bg-yellow-300"></div>
                ) : (
                  <div
                    className={`w-f h-[2px] ${aboutHovered ? "bg-slate-300" : ""}`}
                  ></div>
                )}
              </div>

              {/* <div
                onMouseEnter={() => setContactHovered(true)}
                onMouseLeave={() => setContactHovered(false)}
                className=" cursor-pointer"
                onClick={() => {
                  setDestMenu("Contact");
                }}
              >
                Contact
                {destMenu === "Contact" ? (
                  <div className="w-f h-[2px] bg-yellow-300"></div>
                ) : (
                  <div
                    className={`w-f h-[2px] ${contactHovered ? "bg-slate-300" : ""}`}
                  ></div>
                )}
              </div> */}
            </div>
          </div>

          <div className=" w-full">
            <div className="flex h-7 rounded-full  border px-3 text-sm">
              <input
                className=" w-full font-light outline-none"
                placeholder="search"
              />
              <div className="ml-auto  flex items-center">
                <img className=" " src={searchicon} />
              </div>
            </div>
          </div>
          <div className="w-12 lg:mr-2 lg:w-14">
            <div onClick={cartIconClickhandler}>
              <img className="relative h-6 w-6 cursor-pointer" src={cartIcon} />
              {
                <div className=" absolute top-[13px] ml-3 flex h-4 w-4 items-center justify-center rounded-full bg-red text-xs font-bold text-white lg:top-[17px]">
                  {quantity === undefined ? 0 : quantity}
                </div>
              }
            </div>
          </div>

          {token ? (
            <div className="font-thint font-roboto">
              <div className="flex flex-col items-center text-xs">
                <div className="min-w-[90px] whitespace-nowrap text-center">
                  hello, {name}
                </div>

                <div
                  className="cursor-pointer hover:text-red hover:underline"
                  onClick={logOutClickhandler}
                >
                  log out
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => handleClick("/login")}
              className="min-w-[90px] whitespace-normal rounded-xl bg-yellow-300 px-5 py-[6px] text-sm"
            >
              Sign in
            </button>
          )}

          {hamburgerOpen && (
            <div className=" absolute left-0  top-0  w-full bg-black bg-opacity-15 lg:hidden">
              <div className="h-screen w-[150px] bg-slate-50 p-2">
                <div className="flex flex-col">
                  <img
                    onClick={() => {
                      setHamburgerOpen(false);
                    }}
                    className="ml-auto h-4 w-4"
                    src={close}
                  />
                  <div className="flex flex-col gap-2">
                    <div>Man </div>
                    <div>Woman</div>
                    <div>Home</div>
                    <div>About</div>
                    <div>Contact</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="to-transparen h-[0.5px] bg-gradient-to-r from-transparent via-slate-300"></div>
    </>
  );
};
export default Header;
