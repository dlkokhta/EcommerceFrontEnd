import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCartItems } from "../store/cartItemsSlice";
import hamburher from "../assets/hamburger.svg";
import close from "../assets/close.svg";

interface AdminPanelHeaderProps {
  onDestMenuChange: (newDestMenu: string) => void;
}

const adminPanelHeader: React.FC<AdminPanelHeaderProps> = ({
  onDestMenuChange,
}) => {
  const navigate = useNavigate();
  const [destMenu, setDestMenu] = useState<string>("AllShoes");

  const name = localStorage.getItem("userName");

  const logOutClickhandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("data.email");
    navigate("/login");
    dispatch(setCartItems([]));
  };

  const [allShoesHovered, setallShoesHovered] = useState(false);
  const [addShoesHovered, setAddShoesHovered] = useState(false);
  const [usersHovered, setusersHovered] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState<Boolean>(false);

  const dispatch = useDispatch();

  return (
    <>
      <div className=""></div>
      <div className="fixed top-0 z-40 w-full bg-white">
        <div className="relative mb-5">
          <div className="flex items-center gap-3 px-5 pt-5 lg:px-40">
            <img
              className="h-5 lg:hidden"
              onClick={() => {
                setHamburgerOpen(true);
              }}
              src={hamburher}
              alt="hamburger"
            />
            <h1
              onClick={() => navigate("/adminPanel")}
              className="hidden cursor-pointer font-roboto font-medium lg:block"
            >
              eCommerce Admin Panel
            </h1>

            <div className="ml-10 mt-1 hidden font-roboto font-light lg:block ">
              <div className="items flex flex-row gap-2 lg:text-sm xl:gap-6">
                <div
                  onMouseEnter={() => setallShoesHovered(true)}
                  onMouseLeave={() => setallShoesHovered(false)}
                  className=" cursor-pointer"
                  onClick={() => {
                    setDestMenu("AllShoes"), onDestMenuChange("AllShoes");
                  }}
                >
                  All Shoes
                  {destMenu === "AllShoes" ? (
                    <div className="w-f h-[2px] bg-yellow-300"></div>
                  ) : (
                    <div
                      className={`w-f h-[2px] ${allShoesHovered ? "bg-slate-300" : ""}`}
                    ></div>
                  )}
                </div>

                <div
                  onMouseEnter={() => setAddShoesHovered(true)}
                  onMouseLeave={() => setAddShoesHovered(false)}
                  className=" cursor-pointer"
                  onClick={() => {
                    setDestMenu("AddShoes"), onDestMenuChange("AddShoes");
                  }}
                >
                  Add Shoes
                  {destMenu === "AddShoes" ? (
                    <div className="w-f h-[2px] bg-yellow-300"></div>
                  ) : (
                    <div
                      className={`w-f h-[2px] ${addShoesHovered ? "bg-slate-300" : ""}`}
                    ></div>
                  )}
                </div>

                <div
                  onMouseEnter={() => setusersHovered(true)}
                  onMouseLeave={() => setusersHovered(false)}
                  className=" cursor-pointer"
                  onClick={() => {
                    setDestMenu("Users"), onDestMenuChange("Users");
                  }}
                >
                  Users
                  {destMenu === "Users" ? (
                    <div className="w-f h-[2px] bg-yellow-300"></div>
                  ) : (
                    <div
                      className={`w-f h-[2px] ${usersHovered ? "bg-slate-300" : ""}`}
                    ></div>
                  )}
                </div>
              </div>
            </div>

            <div className="font-thint ml-auto text-right">
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
                      <div onClick={() => onDestMenuChange("AllShoes")}>
                        All Shoes
                      </div>
                      <div onClick={() => onDestMenuChange("AddShoes")}>
                        Add Shoes
                      </div>
                      <div onClick={() => onDestMenuChange("AddShoes")}>
                        Users
                      </div>

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

export default adminPanelHeader;
