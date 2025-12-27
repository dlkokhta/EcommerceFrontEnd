import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import addShoesSchema from "./addShoesSchema.js";
import axios from "axios";
import AddShoesInputFields from "../components/AddShoesInputFields";
import AddShoesSizesInputField from "../components/AddShoesSizesInputField.js";
import AddShoesAddImageField from "../components/AddShoesAddImageField";

const AddShoes = ({ updateAllShoesForAdmin }: any) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addShoesSchema),
    defaultValues: {
      sizes: [{ size: "", quantity: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });

  let url;
  if (process.env.NODE_ENV === "production") {
    url = `https://api.shop.dimitrikokhtashvili.com`;
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
    data.sizes.forEach((size: any) => {
      formData.append("sizes", JSON.stringify(size));
    });
    for (let i = 0; i < data.image.length; i++) {
      formData.append("image", data.image[i]);
    }

    const token = localStorage.getItem("authToken");

    try {
      await axios.post(`${url}/api/addItem`, formData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      await updateAllShoesForAdmin();

      reset();
    } catch (error) {
      console.log(errors);
    }
  };

  return (
    <div>
      <div className="grid-flow-col px-16 pt-5 md:px-60 lg:px-[350px] xl:px-[480px] 2xl:px-[580px] 3xl:px-[750px]">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          className="mb-10 flex flex-col gap-2 border border-slate-400 px-5 py-5"
        >
          <h1 className="text-xl ">Add Shoes</h1>

          <AddShoesInputFields
            label="Brand"
            id="brand"
            register={register}
            errors={errors}
          />

          <AddShoesInputFields
            label="Model"
            id="model"
            register={register}
            errors={errors}
          />

          <AddShoesInputFields
            label="Gender"
            id="gender"
            register={register}
            errors={errors}
          />

          <AddShoesInputFields
            label="Color"
            id="color"
            register={register}
            errors={errors}
          />

          <AddShoesInputFields
            label="Description"
            id="description"
            register={register}
            errors={errors}
          />

          <AddShoesInputFields
            label="Price"
            id="price"
            register={register}
            errors={errors}
          />

          <AddShoesSizesInputField
            register={register}
            errors={errors}
            fields={fields}
            append={append}
            remove={remove}
          />

          <AddShoesAddImageField register={register} errors={errors} />
          <button className=" mt-3 w-full rounded-full bg-yellow-300  px-5 py-2 text-sm">
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
