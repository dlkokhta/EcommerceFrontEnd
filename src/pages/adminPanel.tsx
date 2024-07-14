import AdminPanelHeader from "../components/AdminPanelHeader";
import AddShoes from "../pages/AddShoes";
import ShoesListAdminPanel from "../components/ShoesListAdminPanel";
import { useState } from "react";

const adminPanel = () => {
  const [destMenu, setDestMenu] = useState<string>("AllShoes");

  const handleDestMenuChange = (newDestMenu: string) => {
    setDestMenu(newDestMenu);
  };
  return (
    <div className="">
      <AdminPanelHeader onDestMenuChange={handleDestMenuChange} />;
      <div className="mt-10">
        {destMenu === "AddShoes" ? <AddShoes /> : <ShoesListAdminPanel />}
      </div>
    </div>
  );
};

export default adminPanel;
