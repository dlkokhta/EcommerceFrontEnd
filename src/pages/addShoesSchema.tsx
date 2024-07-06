import * as yup from "yup";

const addShoesSchema = yup.object({
  brand: yup.string().min(2, "brand must be 2 or more characters").required(),
  model: yup.string().min(4, "brand must be 4 or more characters").required(),
  gender: yup.string().min(4, "brand must be 4 or more characters").required(),
  color: yup.string().min(3, "brand must be 3 or more characters").required(),
  description: yup
    .string()
    .min(4, "brand must be 4 or more characters")
    .required(),
  price: yup.number().min(1, "price must be 1 or more characters").required(),

  sizes: yup
    .string()
    // .of(yup.string().min(1, "Size must be 1 or more characters"))
    .required(),
  //   availability: yup.boolean().default(true).required(),
  image: yup.mixed().required(),
});

export default addShoesSchema;
