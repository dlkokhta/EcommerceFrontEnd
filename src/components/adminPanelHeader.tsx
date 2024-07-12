import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { setFilterShoes } from "../store/filterShoesSlice.js";
import { useDispatch } from "react-redux";
import { setFilterShoesByBrand } from "../store/filterShoesByBrandSlice.js";
import { setnewShoes } from "../store/newShoesSlice.js";
import { setCartItems } from "../store/cartItemsSlice";
const adminPanelHeader = () => {
  const navigate = useNavigate();

  const [destMenu, setDestMenu] = useState<string>("");

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

  const [manHovered, setManHovered] = useState(false);
  const [allHovered, setAllHovered] = useState(false);
  const [womanHovered, setWomanHovered] = useState(false);
  const [newHovered, setNewHovered] = useState(false);

  const dispatch = useDispatch();
  const manClickhandler = () => {
    dispatch(setFilterShoes(`Man's`));
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

  const newClickhandler = () => {
    dispatch(setnewShoes(true));
    dispatch(setFilterShoes(""));
  };
  return (
    <>
      <div className=""></div>
      <div className="fixed top-0 z-40 w-full bg-white">
        <div className="relative mb-5">
          <div className="flex items-center gap-3 px-5 pt-5 lg:px-10">
            <h1
              onClick={() => navigate("/")}
              className="hidden cursor-pointer font-roboto font-medium lg:block"
            >
              eCommerce Admin Panel
            </h1>

            <div className="ml-10 mt-1 hidden font-roboto font-light lg:block ">
              <div className="items flex flex-row gap-2 lg:text-sm xl:gap-6">
                <div
                  onMouseEnter={() => setNewHovered(true)}
                  onMouseLeave={() => setNewHovered(false)}
                  className=" cursor-pointer"
                  onClick={() => {
                    navigate("/addItem");
                    setDestMenu("AddShoes");
                    newClickhandler();
                  }}
                >
                  Add Shoes
                  {destMenu === "AddShoes" ? (
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
                  onMouseEnter={() => setManHovered(true)}
                  onMouseLeave={() => setManHovered(false)}
                  className=" cursor-pointer items-center"
                  onClick={() => {
                    navigate("/");
                    setDestMenu("Man"), manClickhandler();
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
                    womenClickhandler();
                    navigate("/");
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
          </div>
        </div>
        <div className="to-transparen h-[0.5px] bg-gradient-to-r from-transparent via-slate-300"></div>
      </div>
    </>
  );
};

export default adminPanelHeader;
