import * as Yup from "yup";

export const signupSchema = Yup.object({
  name: Yup.string().min(4).max(35).required("Please Enter your Name"),
  email: Yup.string().email().required("Please Enter your Email"),
  password: Yup.string().min(8).max(30).required("Please Enter your Password"),
  phone: Yup.string().length(10).required("Please Enter your Phone Number"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please Enter your Email"),
  password: Yup.string().min(8).max(30).required("Please Enter your Password"),
});

export const updateProfileSchema = Yup.object({
  name: Yup.string().min(4).max(35).required("Please Enter your Name"),
  email: Yup.string().email().required("Please Enter your Email"),
  phone: Yup.string().length(10).required("Please Enter your Phone Number"),
});
