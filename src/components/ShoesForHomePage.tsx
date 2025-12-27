import { useSelector } from "react-redux";
import { RootState } from "../store/store.js";
import { allShoesTypes } from "../types/allShoesTypes";
import { useNavigate } from "react-router-dom";

const ShoesForHomePage = ({ updateAllShoesForAdmin }: any) => {
  const allShoes: allShoesTypes[] = useSelector(
    (state: RootState) => state.allShoes.shoes,
  );

  const shoesFilter: string = useSelector(
    (state: RootState) => state.filterShoes.filterShoesValue,
  );

  const shoesFilterByBrand: string = useSelector(
    (state: RootState) => state.filterShoesByBrand.filterShoesByBrandValue,
  );

  const isShoesNew = useSelector(
    (state: RootState) => state.newShoes.newShoesValue,
  );

  const navigate = useNavigate();
  const placeholders = Array(8).fill(null);

  let url;
  if (process.env.NODE_ENV === "production") {
    url = `https://api.shop.dimitrikokhtashvili.com/api`;
  } else {
    url = `http://localhost:3000`;
  }

  const filteredShoes = Array.isArray(allShoes) ? allShoes.filter((shoe) => {
    const genderMatch = shoesFilter ? shoe.gender === shoesFilter : true;
    const brandMatch = shoesFilterByBrand
      ? shoe.brand
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(shoesFilterByBrand.toLowerCase().replace(/\s+/g, ""))
      : true;

    const newShoesMatch = isShoesNew ? shoe.isShoesNew === isShoesNew : true;
    return genderMatch && brandMatch && newShoesMatch;
  }) : [];

  return (
    <div className="mt-24">
      {allShoes && allShoes.length > 0 ? (
        <div className="mt-5 px-5 pt-5 sm:px-27 md:px-8 md:grid md:gap-6 md:grid-cols-2  lg:grid-cols-4 lg:px-10 2xl:grid-cols-4">
          {filteredShoes.map((shoes, index) => (
            <div
              key={index}
             className=" mb-5 sm:mb-8 md:mb-2"
            >
              <div className="mb-2 transition-transform duration-500 transform hover:scale-105 hover:shadow-outer-all-sides  border">
                {shoes.image.slice(0, 1).map((image, index) => (
                  <div key={index} className="">
                    <img
                      className="cursor-pointer xl:max-h-[429px] w-full "
                      src={`${url}/public/storage/images/${image}`}
                      alt={image}
                      onClick={() =>
                        navigate(
                          `/shoesDetails/${shoes.id}`,
                          updateAllShoesForAdmin(),
                        )
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="mb-2 font-roboto text-sm font-light mt-5">
                {shoes.isShoesNew && (
                  <div className="text-sm font-bold text-red">New</div>
                )}
                <div>{shoes.gender}</div>
                <div>{shoes.brand}</div>
                <div className="">{shoes.model}</div>
                <div>${shoes.price}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 px-5 pt-5 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:px-10 2xl:grid-cols-4">
          {placeholders.map((_, index) => (
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

export default ShoesForHomePage;