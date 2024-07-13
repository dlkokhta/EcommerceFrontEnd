import { useForm } from "react-hook-form";
// import { addShoesTypes } from "../types/addShoesTypes.js";
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
    url = `https://ecommerceapi-production-7d9c.up.railway.app`;
  } else {
    url = `http://localhost:3000`;
  }

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("brand", data.brand);
    formData.append("model", data.model);
    formData.append("gender", data.gender);
    formData.append("color", data.color);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("sizes", data.sizes);
    for (let i = 0; i < data.image.length; i++) {
      formData.append("image", data.image[i]);
    }
    console.log("dataa", data);

    const token = localStorage.getItem("authToken");
    console.log("addShoesToken", token);
    try {
      const response = await axios.post(`${url}/api/addItem`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response", response);

      reset();
    } catch (error) {
      console.log(errors);
    }
  };

  return (
    <div>
      <div className="grid-flow-col px-16 pt-5 lg:px-60 xl:px-[600px]">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          className="mb-10 flex flex-col gap-2 border border-slate-400 px-5 py-5"
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
            {errors.brand && (
              <p className="text-xs text-red">{errors.brand.message}</p>
            )}
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
            {errors.model && (
              <p className="text-xs text-red">{errors.model.message}</p>
            )}
          </div>

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
            {errors.gender && (
              <p className="text-xs text-red">{errors.gender.message}</p>
            )}
          </div>
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
            {errors.color && (
              <p className="text-xs text-red">{errors.color.message}</p>
            )}
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
            {errors.description && (
              <p className="text-xs text-red">{errors.description.message}</p>
            )}
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
            {errors.price && (
              <p className="text-xs text-red">{errors.price.message}</p>
            )}
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
            {errors.sizes && (
              <p className="text-xs text-red">{errors.sizes.message}</p>
            )}
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
            {errors.image && (
              <p className="text-xs text-red">{errors.image.message}</p>
            )}
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
