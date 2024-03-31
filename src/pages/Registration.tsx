import { useForm } from "react-hook-form";
import { registratioTypes } from "../types/registrationTypes.js";
import { yupResolver } from "@hookform/resolvers/yup";
import RegistrationSchema from "./RegistrationSchema.js";
import axios from "axios";

const Registration = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(RegistrationSchema) });

  const onSubmit = async (data: registratioTypes) => {
    console.log("data", data);
    const url = "http://localhost:3000/api/register";

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      repeatPassword: data.repeatPassword,
    };

    console.log("userData", userData);

    try {
      const response = await axios.post(url, userData);
      console.log("response.data", response.data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className=" px-16 pt-28">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-10 flex flex-col gap-5 border border-slate-400 px-5 py-5"
        >
          <h1 className="text-xl ">Create account</h1>
          <div className="w-full ">
            <label className="block text-sm " htmlFor="name">
              Your name
            </label>
            <input
              className="w-full border border-slate-400  outline-green-300 "
              type="text"
              id="name"
              {...register("name")}
              name="name"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm" htmlFor="email">
              email
            </label>
            <input
              className="w-full border  border-slate-400  outline-green-300  "
              type="email"
              id="email"
              {...register("email")}
              name="email"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm" htmlFor="password">
              password
            </label>
            <input
              className="w-full border  border-slate-400   outline-green-300 "
              type="password"
              id="password"
              {...register("password")}
              name="password"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm " htmlFor="confirm-password">
              repeat Password
            </label>
            <input
              className="w-full border border-slate-400  outline-green-300 "
              type="password"
              id="confirm-password"
              {...register("repeatPassword")}
              name="repeatPassword"
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

export default Registration;
