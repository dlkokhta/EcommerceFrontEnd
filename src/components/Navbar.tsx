import hamburher from "../assets/hamburger.svg";
import close from "../assets/close.svg";
import { useState } from "react";

const Navbar = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState<Boolean>(false);
  return (
    <>
      <div className="mb-5">
        <div className="relative flex items-center px-5 pt-5 ">
          <img
            onClick={() => {
              setHamburgerOpen(true);
            }}
            src={hamburher}
            alt="hamburger"
          />

          <div className="ml-auto">
            <button className=" bg-yellow-300 rounded-xl px-5 py-1">
              Sign in
            </button>
          </div>

          {hamburgerOpen && (
            <div className=" absolute left-0 top-0 h-screen w-[150px] bg-slate-50 p-2">
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
          )}
        </div>
      </div>

      <div className="h-[0.5px] w-full bg-slate-200"></div>
    </>
  );
};
export default Navbar;
