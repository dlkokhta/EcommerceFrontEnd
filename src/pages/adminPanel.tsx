import AdminPanelHeader from "../components/adminPanelHeader";
import AddShoes from "../pages/AddShoes";
import ShoesListAdminPanel from "../components/shoesListAdminPanel";
import { useState } from "react";

const adminPanel = ({ updateAllShoesForAdmin }: any) => {
  const [destMenu, setDestMenu] = useState<string>("AllShoes");

  const handleDestMenuChange = (newDestMenu: string) => {
    setDestMenu(newDestMenu);
  };
  return (
    <div className="">
      <AdminPanelHeader onDestMenuChange={handleDestMenuChange} />;
      <div className="mt-10">
        {destMenu === "AddShoes" ? (
          <AddShoes updateAllShoesForAdmin={updateAllShoesForAdmin} />
        ) : (
          <ShoesListAdminPanel
            updateAllShoesForAdmin={updateAllShoesForAdmin}
          />
        )}
      </div>
    </div>
  );
};

export default adminPanel;
