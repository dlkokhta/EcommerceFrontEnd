import { useSelector } from "react-redux";
import { RootState } from "../store/store.js";
import { allShoesTypes } from "../types/allShoesTypes.js";
import { useParams } from "react-router-dom";
import { useState } from "react";

const ShoesDetails = () => {
  const allShoes: allShoesTypes[] = useSelector(
    (state: RootState) => state.allShoes.shoes,
  );
  const [selectedShoes, setSelectedShoes] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  console.log("selectedSize", selectedSize);

  const { id } = useParams();
  console.log("iiiidd", id);
  const shoesById = allShoes.filter((shoes) => shoes.id === id);
  console.log("shoesById", shoesById);
  return (
    <div className="">
      <div className="mt-5 px-10 pb-5 pt-5 md:grid-cols-2 md:gap-2 xl:grid-cols-3 xl:px-20 ">
        {shoesById.map((shoes, index) => (
          <div key={index}>
            <div className="mb-2">
              {shoes.image.slice(0, 1).map(
                (
                  image,
                  index, // Use slice to take only the first image
                ) => (
                  <div key={index}>
                    <img
                      src={`http://localhost:3000/public/storage/images/${selectedShoes || shoes.image[0]}`}
                      alt={image}
                      className=""
                    />
                  </div>
                ),
              )}
            </div>
            <div className=" flex max-w-80 gap-2">
              {shoes.image.slice(0, 5).map(
                (
                  image,
                  index, // Use slice to take only the first image
                ) => (
                  <div onClick={() => setSelectedShoes(image)} key={index}>
                    <img
                      src={`http://localhost:3000/public/storage/images/${image}`}
                      alt={image}
                      className={`cursor-pointer border hover:border-green-300 ${selectedShoes === image ? "border-shad border-green-300" : ""}`}
                      onMouseOver={() => setSelectedShoes(image)}
                    />
                  </div>
                ),
              )}
            </div>
            <div className="mb-10 font-roboto text-sm font-light">
              <div>
                <span className="font-normal">Brand: </span>
                {shoes.brand}
              </div>
              <div>
                <span className="font-normal">Model: </span>
                {shoes.model}
              </div>
              <div>
                <span className="font-normal">Price: </span>${shoes.price}
              </div>
              <div className="mb-3">
                <span className="font-normal">Color: </span>
                {shoes.color}
              </div>
              <div className="mb-7 grid grid-cols-4 gap-1">
                {shoes.sizes.map((size) => (
                  <div
                    onClick={() => setSelectedSize(size)}
                    className={` inline-block border-2 text-center ${selectedSize === size ? "bg-slate-500 text-white" : ""}`}
                  >
                    {size}
                  </div>
                ))}
              </div>

              <div>
                <div> - </div>
                <h1>Quantity:{}</h1>
                <div> + </div>
              </div>

              <div className="mb-5 flex flex-col justify-center gap-3">
                <button className=" w-full rounded-xl bg-yellow-300 px-5 py-2  text-sm hover:bg-yellow-400">
                  Add to cart
                </button>
                <button className=" w-full rounded-xl bg-orange-500 px-5 py-2  text-sm hover:bg-orange-600">
                  Buy now
                </button>
              </div>

              <h1 className=" font-normal">description</h1>
              <div>{shoes.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ShoesDetails;
