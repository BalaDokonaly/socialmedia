import * as yup from "yup";
import moment from "moment";
export const registerValidation = yup.object({
    fullName: yup
      .string()
      .trim()
      .required("Full Name is required")
      .matches(/^[a-zA-Z ]*$/, "Only alphabets are allowed"),
    designation: yup
      .string()
      .required("Designation is required"),
    email: yup
      .string()
      .email("Enter valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .trim()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.,_]).{8,}$/,
        "Invalid Password format"
      ),
    dob: yup
      .string()
      .required("ETD is required")
      .transform((value) =>
        value !== null ? moment(value).format("MM-DD-YYYY") : value
      ),
    conPassword: yup
      .string()
      .trim()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Password does not match"),
  });