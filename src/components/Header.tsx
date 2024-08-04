import hamburher from "../assets/hamburger.svg";
import close from "../assets/close.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cartIcon from "../assets/shoppingCart.png";
import searchicon from "../assets/search.svg";
import { RootState } from "../store/store.js";
import { cartItemsTypes } from "../types/cartItemsTypes";
import { useSelector } from "react-redux";
import { setFilterShoes } from "../store/filterShoesSlice.js";
import { useDispatch } from "react-redux";
import { setFilterShoesByBrand } from "../store/filterShoesByBrandSlice.js";
import { setnewShoes } from "../store/newShoesSlice.js";
import { setCartItems } from "../store/cartItemsSlice";
import ChangePassword from "./ChangePassword.js";

const Header = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState<Boolean>(false);
  const [destMenu, setDestMenu] = useState<string>("All");
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
    dispatch(setCartItems([]));
  };

  const [menHovered, setMenHovered] = useState(false);
  const [allHovered, setAllHovered] = useState(false);
  const [womenHovered, setWomenHovered] = useState(false);
  const [newHovered, setNewHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  const [search, setSearch] = useState("");
  const [isUserMenuVisible, setIsUserMenuVisible] = useState<boolean>(false);

  const cartIconClickhandler = () => {
    navigate("/cartItems/{email}");
  };
  const dispatch = useDispatch();
  const menClickhandler = () => {
    dispatch(setFilterShoes(`Men's`));
    dispatch(setFilterShoesByBrand(""));
    dispatch(setnewShoes(false));
  };
  const womenClickhandler = () => {
    dispatch(setFilterShoes(`Women's`));

    dispatch(setFilterShoesByBrand(""));
    dispatch(setnewShoes(false));
  };
  const allClickhandler = () => {
    dispatch(setFilterShoes(""));
    dispatch(setFilterShoesByBrand(""));
    dispatch(setnewShoes(false));
  };
  const searchChnageHandler = (event: any) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const newClickhandler = () => {
    dispatch(setnewShoes(true));
    dispatch(setFilterShoes(""));
  };

  const searchClickhandler = () => {
    dispatch(setFilterShoesByBrand(search));

    setSearch("");
  };

  return (
    <>
      <div className="fixed top-0 z-40 w-full bg-white">
        <div className="relative mb-5">
          <div className="flex items-center gap-3 px-5 pt-5 lg:px-10">
            <img
              className="h-5 lg:hidden"
              onClick={() => {
                setHamburgerOpen(true);
              }}
              src={hamburher}
              alt="hamburger"
            />
            <h1
              onClick={() => navigate("/")}
              className="hidden cursor-pointer font-roboto font-medium lg:block"
            >
              eCommerce
            </h1>
            <div className="ml-10 mt-1 hidden font-roboto font-light lg:block ">
              <div className="items flex flex-row gap-2 lg:text-sm xl:gap-6">
                <div
                  onMouseEnter={() => setNewHovered(true)}
                  onMouseLeave={() => setNewHovered(false)}
                  className=" cursor-pointer"
                  onClick={() => {
                    navigate("/");
                    setDestMenu("New");
                    newClickhandler();
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
                  onMouseEnter={() => setAllHovered(true)}
                  onMouseLeave={() => setAllHovered(false)}
                  className=" cursor-pointer"
                  onClick={() => {
                    navigate("/");
                    setDestMenu("All");
                    allClickhandler();
                  }}
                >
                  All
                  {destMenu === "All" ? (
                    <div className="w-f h-[2px] bg-yellow-300"></div>
                  ) : (
                    <div
                      className={`w-f h-[2px] ${allHovered ? "bg-slate-300" : ""}`}
                    ></div>
                  )}
                </div>
                <div
                  onMouseEnter={() => setMenHovered(true)}
                  onMouseLeave={() => setMenHovered(false)}
                  className=" cursor-pointer items-center"
                  onClick={() => {
                    navigate("/");
                    setDestMenu("Men"), menClickhandler();
                  }}
                >
                  Men
                  {destMenu === "Men" ? (
                    <div className="w-f h-[2px] bg-yellow-300"></div>
                  ) : (
                    <div
                      className={`w-f h-[2px] ${menHovered ? "bg-slate-300" : ""}`}
                    ></div>
                  )}
                </div>

                <div
                  onMouseEnter={() => setWomenHovered(true)}
                  onMouseLeave={() => setWomenHovered(false)}
                  className=" cursor-pointer"
                  onClick={() => {
                    setDestMenu("Women");
                    womenClickhandler();
                    navigate("/");
                  }}
                >
                  Women
                  {destMenu === "Women" ? (
                    <div className="w-f h-[2px] bg-yellow-300"></div>
                  ) : (
                    <div
                      className={`w-f h-[2px] ${womenHovered ? "bg-slate-300" : ""}`}
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
              </div>
            </div>
            <div className=" w-full">
              <div className="flex h-7 rounded-full  border px-3 text-sm">
                <input
                  className=" w-full font-light outline-none"
                  placeholder="Search by brand"
                  value={search}
                  onChange={searchChnageHandler}
                />
                <div className="ml-auto  flex cursor-pointer items-center">
                  <img
                    onClick={searchClickhandler}
                    className=""
                    src={searchicon}
                  />
                </div>
              </div>
            </div>
            <div className="w-12 lg:mr-2 lg:w-14">
              <div onClick={cartIconClickhandler}>
                <img
                  className="relative h-6 w-6 cursor-pointer"
                  src={cartIcon}
                />
                {
                  <div className=" absolute top-[13px] ml-3 flex h-4 w-4 items-center justify-center rounded-full bg-red text-xs font-bold text-white lg:top-[15px]">
                    {quantity === undefined ? 0 : quantity}
                  </div>
                }
              </div>
            </div>

            {token ? (
              <div className="font-thint font-roboto">
                <div
                  onMouseEnter={() => {
                    setIsUserMenuVisible(true);
                  }}
                  onMouseLeave={() => {
                    setIsUserMenuVisible(false);
                  }}
                  className="relative flex cursor-pointer flex-col items-center border py-1 text-xs"
                >
                  <div className="min-w-[90px] whitespace-nowrap text-center">
                    hello, {name}
                  </div>
                  {isUserMenuVisible ? (
                    <div className="absolute top-[25px] bg-white  px-3 pb-2">
                      <div className="mt-5 cursor-pointer hover:text-red hover:underline">
                        <ChangePassword
                          message="reset password"
                          direction="/resetPassword"
                        />
                      </div>
                      <div
                        className="mt-5 cursor-pointer hover:text-red hover:underline "
                        onClick={logOutClickhandler}
                      >
                        log out
                      </div>

                      <div className="mt-5 h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleClick("/login")}
                className="min-w-[90px] whitespace-normal rounded-xl bg-yellow-300 px-5 py-[6px] text-sm hover:bg-yellow-400"
              >
                Sign in
              </button>
            )}
            {hamburgerOpen && (
              <div className=" absolute left-0  top-0  w-full bg-black bg-opacity-15 lg:hidden">
                <div className="h-screen w-[150px] bg-slate-50 p-2 transition-all	 duration-200">
                  <div className="flex flex-col">
                    <img
                      onClick={() => {
                        setHamburgerOpen(false);
                      }}
                      className="ml-auto h-4 w-4"
                      src={close}
                    />
                    <div className="ml-2 flex flex-col gap-2">
                      <div onClick={() => navigate("/")}>Home</div>
                      <div onClick={() => newClickhandler()}>New</div>
                      <div onClick={() => allClickhandler()}>All</div>
                      <div onClick={() => menClickhandler()}>Men</div>
                      <div onClick={() => womenClickhandler()}>Women</div>
                      <div
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="to-transparen h-[0.5px] bg-gradient-to-r from-transparent via-slate-300"></div>
      </div>
    </>
  );
};
export default Header;
