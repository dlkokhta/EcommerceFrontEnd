import AdminPanelHeader from "../components/adminPanelHeader";
// import AddShoes from "../pages/AddShoes";
// import ShoesListAdminPanel from "../components/shoesListAdminPanel";
// import { useState } from "react";
// import UsersListForAdminPanel from "../components/UsersListForAdminPanel";

const adminPanel = () => {
  // const [destMenu, setDestMenu] = useState<string>("AllShoes");
  // console.log("destMenu", destMenu);
  // const handleDestMenuChange = (newDestMenu: string) => {
  //   setDestMenu(newDestMenu);
  // };
  return (
    <div className="">
      <AdminPanelHeader />;
      {/* <div className="mt-10">
        {destMenu === "AddShoes" ? (
          <AddShoes updateAllShoesForAdmin={updateAllShoesForAdmin} />
        ) : destMenu === "AllShoes" ? (
          <ShoesListAdminPanel
           
          />
        ) : (
          <UsersListForAdminPanel />
        )}
      </div> */}
    </div>
  );
};

export default adminPanel;
