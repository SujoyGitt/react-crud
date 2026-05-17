import * as yup from "yup";

export const userSchema = yup.object({
  name: yup.string().required("Name is required"),

  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),

  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .positive("Age must be positive")
    .integer("Age must be an integer")
    .min(18, "Age cannot be less than 18")
    .max(80, "Age cannot be more than 80"),
});
