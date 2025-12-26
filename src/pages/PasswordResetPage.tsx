import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordResetPageSchema from "./PasswordResetPageSchema.js";
import axios from "axios";
import { passwordResetTypes } from "../types/passwordResetTypes.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setCartItems } from "../store/cartItemsSlice";
import { useDispatch } from "react-redux";
import RegistrationSuccess from "../components/RegistrationSuccess";

const PasswordResetPage = () => {
  const [responseError, setResponseError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(PasswordResetPageSchema),
  });
  const token = localStorage.getItem("authToken");

  let url;
  if (process.env.NODE_ENV === "production") {
   url = `https://api.shop.dimitrikokhtashvili.com/api`;
  } else {
    url = `http://localhost:3000`;
  }
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("data.email");

  const onSubmit = async (data: passwordResetTypes) => {
    try {
      const response = await axios.post(
        `${url}/api/resetPassword`,
        {
          email: userEmail,
          password: data.password,
        },
        { 
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        },
      );
      setResponseMessage(response.data.message);
      console.log("responseeee", response.data);
      localStorage.removeItem("authToken");
      localStorage.removeItem("data.email");

      dispatch(setCartItems([]));

      reset();
    } catch (error: any) {
      setResponseError(error.response.data.message);
    }
  };

  showModal ? navigate("/login") : null;
  return (
    <div className="pt-10">
      {responseMessage && !showModal ? (
        <RegistrationSuccess
          message={responseMessage}
          onClose={() => setShowModal(true)}
        />
      ) : (
        ""
      )}
      <h1
        onClick={() => navigate("/")}
        className="cursor-pointer text-center font-roboto font-medium"
      >
        eCommerce
      </h1>

      <div className="px-16 pt-16 md:px-60 lg:px-[350px] xl:px-[470px] 2xl:px-[600px] 3xl:px-[750px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-5 flex flex-col gap-3 border border-slate-400 px-5 py-5"
        >
          <h1 className="text-xl ">Reset Password</h1>
          <span className="text-xs">Enter new password</span>
          <h1 className="text-xs "></h1>
          <div className="w-full">
            <label className="block text-sm" htmlFor="password">
              password
            </label>
            <input
              className={`w-full border ${errors.password ? `border-red` : `border-slate-400`} outline-none`}
              type="password"
              id="password"
              {...register("password")}
              name="password"
            />
            {errors.password ? (
              <div className="text-xs text-red">{errors.password.message}</div>
            ) : (
              responseError && (
                <div className="text-xs text-red">{responseError}</div>
              )
            )}
          </div>
          <div className="w-full">
            <label className="block text-sm " htmlFor="confirm-password">
              Repeat Password
            </label>
            <input
              className={`w-full border ${errors.repeatPassword ? `border-red` : `border-slate-400`} outline-none`}
              type="password"
              id="confirm-password"
              {...register("repeatPassword")}
              name="repeatPassword"
            />
            {errors.repeatPassword ? (
              <div className="text-xs text-red">
                {errors.repeatPassword.message}
              </div>
            ) : (
              responseError && (
                <div className="text-xs text-red">{responseError}</div>
              )
            )}
          </div>

          <button className=" w-full rounded-xl bg-yellow-300 px-5 py-2  text-sm hover:bg-yellow-400">
            Submit
          </button>
        </form>
      </div>

      <div className="mt-40">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
