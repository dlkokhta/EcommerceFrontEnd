import { useForm } from "react-hook-form";
import { addShoesTypes } from "../types/addShoesTypes.js";
import { yupResolver } from "@hookform/resolvers/yup";
import addShoesSchema from "./addShoesSchema.js";
import axios from "axios";

const AddShoes = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(addShoesSchema) });

  let url;
  if (process.env.NODE_ENV === "production") {
    // Use production backend URL
    url = `https://ecommerceapi-production-7d9c.up.railway.app/api`;
  } else {
    // Use local backend URL
    url = `http://localhost:3000/api`;
  }

  const onSubmit = async (data: addShoesTypes) => {
    const userData = new FormData();
    userData.append("brand", data.brand);
    userData.append("model", data.model);
    // userData.append("gender", data.gender);
    userData.append("color", data.color);
    userData.append("description", data.description);
    userData.append("price", data.price.toString());
    userData.append("sizes", data.sizes);
    userData.append("image", data.image[0]);

    try {
      await axios.post(`${url}/api/addItem`, userData);

      reset();
    } catch (error) {
      console.log(errors);
    }
  };

  return (
    <div>
      <div className="px-16 pt-28 lg:px-60 xl:px-[600px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-10 flex flex-col gap-5 border border-slate-400 px-5 py-5"
        >
          <h1 className="text-xl ">Add Shoes</h1>
          <div className="w-full ">
            <label className="block text-sm " htmlFor="brand">
              brand
            </label>
            <input
              className="w-full border border-slate-400  outline-green-300 "
              type="text"
              id="brand"
              {...register("brand")}
              name="brand"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm" htmlFor="model">
              model
            </label>
            <input
              className="w-full border  border-slate-400  outline-green-300  "
              type="text"
              id="model"
              {...register("model")}
              name="model"
            />
          </div>
          {/* 
          <div className="w-full">
            <label className="block text-sm" htmlFor="gender">
              gender
            </label>
            <input
              className="w-full border  border-slate-400  outline-green-300  "
              type="text"
              id="gender"
              {...register("gender")}
              name="gender"
            />
          </div> */}
          <div className="w-full">
            <label className="block text-sm" htmlFor="color">
              color
            </label>
            <input
              className="w-full border  border-slate-400   outline-green-300 "
              type="text"
              id="color"
              {...register("color")}
              name="color"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm " htmlFor="description">
              description
            </label>
            <input
              className="w-full border border-slate-400  outline-green-300 "
              type="text"
              id="description"
              {...register("description")}
              name="description"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm " htmlFor="price">
              price
            </label>
            <input
              className="w-full border border-slate-400  outline-green-300 "
              type="text"
              id="price"
              {...register("price")}
              name="price"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm " htmlFor="sizes">
              sizes
            </label>
            <input
              className="w-full border border-slate-400  outline-green-300 "
              type=""
              id="sizes"
              {...register("sizes")}
              name="sizes"
              placeholder="Enter sizes separated by comma (e.g., 8,9,10)"
            />
          </div>
          {/* <div className="w-full">
            <label className="block text-sm " htmlFor="availability">
              availability
            </label>
            <input
              className="w-full border border-slate-400  outline-green-300 "
              type="text"
              id="availability"
              {...register("availability")}
              name="availability"
            />
          </div> */}
          <div className="w-full">
            <label className="block text-sm " htmlFor="image">
              image
            </label>
            <input
              className="w-full border border-slate-400  outline-green-300 "
              type="file"
              id="image"
              {...register("image")}
              name="image"
              multiple
            />
          </div>
          <button className=" w-full rounded-xl bg-yellow-300 px-5  py-2 text-sm">
            Submit
          </button>
        </form>
      </div>
      <div className="">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
      </div>
    </div>
  );
};

export default AddShoes;
