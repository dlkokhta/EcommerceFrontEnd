import ShoesForHomePage from "../components/ShoesForHomePage";
import instagram from "../assets/instagram.png";
import instagramColor from "../assets/instagramColor.png";
import facebookColor from "../assets/facebookColor.png";
import facebook from "../assets/facebook.png";
import x from "../assets/x.png";
import xSecond from "../assets/xSecond.png";
import linkedinColor from "../assets/linkedinColor.png";
import linkedin from "../assets/linkedin.png";
import { useEffect, useState } from "react";

const HomePage = ({ updateAllShoesForAdmin }: any) => {
  const token = localStorage.getItem("authToken");
  const [facebookHover, setFacebookHover] = useState(false);
  const [xHover, setXHover] = useState(false);
  const [linkedinHover, setLinkedinHover] = useState(false);
  const [instagramHover, setInstagramHover] = useState(false);

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
            <div className="duration-400 relative h-6 w-6  cursor-pointer transition hover:-translate-y-1">
              <img
                src={instagramHover ? instagramColor : instagram}
                alt="instagramHover"
                onMouseEnter={() => setInstagramHover(true)}
                onMouseLeave={() => setInstagramHover(false)}
              />
            </div>
            <div className="duration-400 relative h-6 w-6  cursor-pointer transition hover:-translate-y-1">
              <img
                src={facebookHover ? facebookColor : facebook}
                alt="Facebook"
                onMouseEnter={() => setFacebookHover(true)}
                onMouseLeave={() => setFacebookHover(false)}
              />
            </div>
            <div className="duration-400 relative h-6 w-6  cursor-pointer transition hover:-translate-y-1">
              <img
                src={xHover ? xSecond : x}
                alt="x"
                onMouseEnter={() => setXHover(true)}
                onMouseLeave={() => setXHover(false)}
              />
            </div>
            <div className="duration-400 relative h-6 w-6  cursor-pointer transition hover:-translate-y-1">
              <img
                src={linkedinHover ? linkedinColor : linkedin}
                alt="linkedin"
                onMouseEnter={() => setLinkedinHover(true)}
                onMouseLeave={() => setLinkedinHover(false)}
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
