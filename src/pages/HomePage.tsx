import ShoesForHomePage from "../components/ShoesForHomePage";

const HomePage = () => {
  return (
    <div>
      <ShoesForHomePage />
      <footer>
        <div className="">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        </div>
        <div className="h-20 w-full">footer</div>
      </footer>
    </div>
  );
};

export default HomePage;
