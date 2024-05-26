import { useSelector } from "react-redux";
import { RootState } from "../store/store.js";
import { allShoesTypes } from "../types/allShoesTypes";
import { useNavigate } from "react-router-dom";

const ShoesForHomePage = () => {
  const allShoes: allShoesTypes[] = useSelector(
    (state: RootState) => state.allShoes.shoes,
  );
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="mt-5 px-5 pt-5 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:px-10 xl:px-20 ">
        {allShoes.map((shoes, index) => (
          <div key={index}>
            <div className="mb-2">
              {shoes.image.slice(0, 1).map(
                (
                  image,
                  index, // Use slice to take only the first image
                ) => (
                  <div key={index}>
                    <img
                      src={`http://localhost:3000/public/storage/images/${image}`}
                      alt={image}
                      onClick={() => navigate(`/shoesDetails/${shoes.id}`)}
                    />
                  </div>
                ),
              )}
            </div>
            {/* <div className=" flex max-w-60 gap-1">
              {shoes.image.slice(1, 5).map(
                (
                  image,
                  index, // Use slice to take only the first image
                ) => (
                  <div key={index}>
                    <img
                      src={`http://localhost:3000/public/storage/images/${image}`}
                      alt={image}
                      className=""
                    />
                  </div>
                ),
              )}
            </div> */}
            <div className="mb-10 font-roboto text-sm font-light">
              <div>{shoes.brand}</div>
              <div className="">{shoes.model}</div>
              <div>${shoes.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoesForHomePage;
