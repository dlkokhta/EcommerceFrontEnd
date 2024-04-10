import { useSelector } from "react-redux";
import { RootState } from "../store/store.js";
import { allShoesTypes } from "../types/allShoesTypes";

const ShoesForHomePage = () => {
  const allShoes: allShoesTypes[] = useSelector(
    (state: RootState) => state.allShoes.shoes,
  );
  return (
    <div className="grid grid-cols-3">
      {allShoes.map((shoes, index) => (
        <div key={index}>
          {shoes.image.slice(0, 1).map(
            (
              image,
              index, // Use slice to take only the first image
            ) => (
              <div key={index}>
                <img
                  src={`http://localhost:3000/public/storage/images/${image}`}
                  alt={image}
                  className="h-40 w-80"
                />
              </div>
            ),
          )}

          <div>{shoes.brand}</div>
          <div>{shoes.model}</div>
          <div>${shoes.price}</div>
          <div>{shoes.availability ? "Available" : "Not available"}</div>
        </div>
      ))}
    </div>
  );
};

export default ShoesForHomePage;
