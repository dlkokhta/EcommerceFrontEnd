import ShoesForHomePage from "../components/ShoesForHomePage";
import instagram from "../assets/instagram.png";
import facebook from "../assets/facebook.png";
import x from "../assets/x.png";
import linkedin from "../assets/linkedin.png";
import { useEffect, useState } from "react";

const HomePage = ({ updateAllShoesForAdmin }: any) => {
  const token = localStorage.getItem("authToken");

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
    }
  }, [token]);

  setTimeout(() => setLoading(false), 700);

  return (
    <div>
      <ShoesForHomePage updateAllShoesForAdmin={updateAllShoesForAdmin} />
      <footer className="font-light lg:px-10">
        {loading && (
          <div className="fixed inset-0 z-50 flex h-full w-full items-center  justify-center bg-slate-400/20">
            <div className="loading-spinner left-[50%] top-[40%]"></div>
          </div>
        )}

        <div>
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        </div>
        <div className="flex flex-col-reverse items-center gap-5 pb-10 pt-10 md:flex-row md:justify-between md:px-40">
          <div className=" ">© 2024 DLK, Inc. All Rights Reserved</div>
          <div>
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="cursor-pointer  text-blue-500  hover:text-red "
            >
              Home
            </div>
            <a
              href="mailto:dl.kokhtashvili@gmail.com"
              className="cursor-pointer  text-blue-500  hover:text-red "
            >
              Email: dl.kokhtashvili@gmail.com
            </a>
            <div>Mobile: +995555331167</div>
          </div>
          <div className="flex gap-5">
            <img src={instagram} className="h-6 w-6 cursor-pointer" />
            <img src={facebook} className="h-6 w-6 cursor-pointer" />
            <img src={x} className="h-6 w-6 cursor-pointer" />
            <img src={linkedin} className="h-6 w-6 cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
