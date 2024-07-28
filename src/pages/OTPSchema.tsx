import * as yup from "yup";

const OTPSchema = yup.object({
  otp: yup.string().required("otp is required"),
});

export default OTPSchema;
