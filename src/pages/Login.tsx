import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "./LoginSchema";
import axios from "axios";
import { loginTypes } from "../types/loginTypes.js";
import { useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";

const Login = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (data: loginTypes) => {
    const url = "http://localhost:3000/api/login";
    console.log("data", data);

    const userData = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(url, userData);
      console.log("response.data", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      {/* <img className="w-15 h-10" src={logo} /> */}
      <div className="px-16 pt-28 lg:px-60 xl:px-[600px] ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-10 flex flex-col gap-5 border border-slate-400 px-5 py-5"
        >
          <h1 className="text-xl ">Sign in</h1>

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

          <button className=" w-full rounded-xl bg-yellow-300 px-5  py-2 text-sm">
            Submit
          </button>
        </form>
      </div>
      <div className="px-16 lg:px-60 xl:px-[580px]">
        <button
          onClick={() => handleClick("/registration")}
          className="mb-10 w-full rounded-xl bg-gradient-to-r from-transparent via-slate-300 to-transparent px-5  py-2 text-sm"
        >
          Create your account
        </button>
      </div>

      <div className="">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
      </div>
    </div>
  );
};

export default Login;
