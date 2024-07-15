import { useSelector } from "react-redux";
import { RootState } from "../store/store.js";
import { allShoesTypes } from "../types/allShoesTypes.js";
import axios from "axios";

const ShoesListAdminPanel = ({ updateAllShoesForAdmin }: any) => {
  const allShoes: allShoesTypes[] = useSelector(
    (state: RootState) => state.allShoes.shoes,
  );

  let url;
  if (process.env.NODE_ENV === "production") {
    url = `https://ecommerceapi-production-7d9c.up.railway.app`;
  } else {
    url = `http://localhost:3000`;
  }

  const handleClick = async (id: string) => {
    console.log("id", id);
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`${url}/api/deleteShoesByAdmin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await updateAllShoesForAdmin();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-24 px-60">
      {allShoes && allShoes.length > 0 ? (
        <div className="mt-5 px-5 pt-5">
          {allShoes.map((shoes, index) => (
            <div key={index} className="flex gap-40">
              <div className="mb-10">
                {shoes.image.slice(0, 1).map((image, index) => (
                  <div key={index} className="">
                    <img
                      className="xl:max-h-[200px]"
                      src={`${url}/public/storage/images/${image}`}
                      alt={image}
                    />
                  </div>
                ))}
              </div>

              <div className="mb-10 flex flex-col font-roboto text-sm font-light">
                {shoes.isShoesNew && (
                  <div className="text-sm font-bold text-red">New</div>
                )}
                <div>{shoes.gender}</div>
                <div>{shoes.brand}</div>
                <div className="">{shoes.model}</div>
                <div>${shoes.price}</div>
              </div>
              <div className="">
                <button
                  onClick={() => handleClick(shoes.id)}
                  className="rounded-full bg-red px-5 py-1 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 px-5 pt-5 lg:px-10">
          {allShoes.map((_, index) => (
            <div key={index} className="placeholder">
              <div className="mb-2 h-48 animate-pulse bg-gray-200"></div>
              <div className="mb-10 font-roboto text-sm font-light">
                <div className="mb-1 h-4 w-3/4 animate-pulse bg-gray-200"></div>
                <div className="mb-1 h-4 w-2/3 animate-pulse bg-gray-200"></div>
                <div className="h-4 w-1/2 animate-pulse bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoesListAdminPanel;
