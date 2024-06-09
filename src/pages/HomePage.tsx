import ShoesForHomePage from "../components/ShoesForHomePage";
import instagram from "../assets/instagram.png";
import facebook from "../assets/facebook.png";
import x from "../assets/x.png";
import linkedin from "../assets/linkedin.png";

const HomePage = () => {
  return (
    <div>
      <ShoesForHomePage />
      <footer className="font-light lg:px-10">
        <div>
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        </div>
        <div className="flex items-center justify-between pb-10 pt-10">
          <div className=" ">© 2024 DLK, Inc. All Rights Reserved</div>
          <div>
            <div>Home:</div>
            <div>Email:</div>
            <div>Mobile:</div>
          </div>
          <div className="flex gap-3">
            <img src={instagram} className="h-6 w-6" />
            <img src={facebook} className="h-6 w-6" />
            <img src={x} className="h-6 w-6" />
            <img src={linkedin} className="h-6 w-6" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
