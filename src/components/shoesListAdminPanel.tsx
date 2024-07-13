import { useSelector } from "react-redux";
import { RootState } from "../store/store.js";
import { allShoesTypes } from "../types/allShoesTypes";

const shoesListAdminPanel = () => {
  const allShoes: allShoesTypes[] = useSelector(
    (state: RootState) => state.allShoes.shoes,
  );

  let url;
  if (process.env.NODE_ENV === "production") {
    // Use production backend URL
    url = `https://ecommerceapi-production-7d9c.up.railway.app`;
  } else {
    // Use local backend URL
    url = `http://localhost:3000`;
  }

  return (
    <div className="mt-24 px-40">
      {allShoes && allShoes.length > 0 ? (
        <div className="mt-5 px-5 pt-5">
          {allShoes.map((shoes, index) => (
            <div key={index} className="flex gap-20">
              <div className="mb-10">
                {shoes.image.slice(0, 1).map((image, index) => (
                  <div key={index} className="">
                    <img
                      className="cursor-pointer xl:max-h-[200px]"
                      src={`${url}/public/storage/images/${image}`}
                      alt={image}
                    />
                  </div>
                ))}
              </div>

              <div className="mb-10 flex flex-col justify-center font-roboto text-sm font-light">
                {shoes.isShoesNew && (
                  <div className="text-sm font-bold text-red">New</div>
                )}
                <div>{shoes.gender}</div>
                <div>{shoes.brand}</div>
                <div className="">{shoes.model}</div>
                <div>${shoes.price}</div>
              </div>
              <div className="flex justify-center">
                <button>Delete</button>
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

export default shoesListAdminPanel;
