import { useNavigate } from "react-router-dom";
const adminPanel = () => {
  const navigate = useNavigate();
  return (
    <div className="flex ">
      <div className="pb-full border px-10 pt-10">
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer text-center"
        >
          Admin Panel
        </h1>
        <h2 onClick={() => navigate("/addShoes")} className=" cursor-pointer">
          add Shoes
        </h2>
      </div>
      <div>user info</div>
    </div>
  );
};

export default adminPanel;
