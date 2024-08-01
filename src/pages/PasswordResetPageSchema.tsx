import * as yup from "yup";

const PasswordResetPageSchema = yup.object({
  password: yup
    .string()
    .required("password is required")
    .min(8, "Minimum 8 characters required")
    .max(25, "password must contain 25 ot less charachters"),

  repeatPassword: yup
    .string()
    .required("Re-enter your password")
    .min(8, "must be 8 or more characters")
    .max(25, "password must contain 25 ot less charachters")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export default PasswordResetPageSchema;
