import * as yup from "yup";

const emailValidationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const PasswordRecoverySchema = yup.object({
  email: yup
    .string()
    .matches(emailValidationRegex, "email must be a valid email")
    .email("email must be a valid")
    .required("email is required"),
});

export default PasswordRecoverySchema;
