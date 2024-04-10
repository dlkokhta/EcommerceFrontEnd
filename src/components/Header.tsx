import hamburher from "../assets/hamburger.svg";
import close from "../assets/close.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.js";

const Header = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState<Boolean>(false);
  const [destMenu, setDestMenu] = useState<string>("");
  const name = useSelector((store: RootState) => store.userName.userNameValue);

  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };
  const token = localStorage.getItem("authToken");
  const logOutClickhandler = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const [manHovered, setManHovered] = useState(false);
  const [womanHovered, setWomanHovered] = useState(false);
  const [homeHovered, setHomeHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  const [contactHovered, setContactHovered] = useState(false);
  const [brandHovered, setBrandHovered] = useState(false);

  return (
    <>
      <div className="mb-5">
        <div className="flex items-center px-5 pt-5 lg:px-20 xl:px-20  ">
          <img
            className="h-5 lg:hidden"
            onClick={() => {
              setHamburgerOpen(true);
            }}
            src={hamburher}
            alt="hamburger"
          />

          <h1 className="hidden font-roboto font-medium lg:block">eCommerce</h1>

          <div className="ml-10 mt-1 hidden font-roboto font-light lg:block">
            <div className="items flex flex-row gap-2 lg:text-sm xl:gap-6">
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
                onMouseEnter={() => setHomeHovered(true)}
                onMouseLeave={() => setHomeHovered(false)}
                className=" cursor-pointer"
                onClick={() => {
                  setDestMenu("Home");
                }}
              >
                Home
                {destMenu === "Home" ? (
                  <div className="w-f h-[2px] bg-yellow-300"></div>
                ) : (
                  <div
                    className={`w-f h-[2px] ${homeHovered ? "bg-slate-300" : ""}`}
                  ></div>
                )}
              </div>
              <div
                onMouseEnter={() => setAboutHovered(true)}
                onMouseLeave={() => setAboutHovered(false)}
                className=" cursor-pointer"
                onClick={() => {
                  setDestMenu("About");
                }}
              >
                Brand
                {destMenu === "About" ? (
                  <div className="w-f h-[2px] bg-yellow-300"></div>
                ) : (
                  <div
                    className={`w-f h-[2px] ${aboutHovered ? "bg-slate-300" : ""}`}
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
                About
                {destMenu === "Brand" ? (
                  <div className="w-f h-[2px] bg-yellow-300"></div>
                ) : (
                  <div
                    className={`w-f h-[2px] ${brandHovered ? "bg-slate-300" : ""}`}
                  ></div>
                )}
              </div>
              <div
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
              </div>
            </div>
          </div>

          {token ? (
            <div className="ml-auto h-5 font-roboto font-light">
              <div className="flex flex-col items-center text-sm">
                <div>hello, {name}</div>
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
              className=" ml-auto rounded-xl bg-yellow-300 px-5 py-1 text-sm"
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
                    <div>Man</div>
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
