import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const Register: React.FC = () => {
  const [formValues, setFormValues] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    let newErrors = { userName: "", email: "", password: "" };

    if (!formValues.userName.trim()) {
      newErrors.userName = "Username is required.";
      valid = false;
    } else if (formValues.userName.length < 4) {
      newErrors.userName = "Username must be at least 4 characters long.";
      valid = false;
    }

    if (!formValues.email.trim()) {
      newErrors.email = "E-mail is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "E-mail invalid";
      valid = false;
    }

    if (!formValues.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formValues.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validate()) {
    }
    try {
      await register(
        formValues.userName,
        formValues.email,
        formValues.password
      );

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === "User already exists with this email"
        ) {
          setErrors((prev) => ({
            ...prev,
            email:
              "This email is already registered. Please use a different email.",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            password: "Register failed. Please check your credentials.",
          }));
        }
      } else {
        console.error("Unknown error:", error);
        setErrors((prev) => ({
          ...prev,
          password: "An unexpected error occurred. Please try again later.",
        }));
      }
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Remove erro ao digitar
  };

  return (
    <AuthForm
      title="Register"
      fields={[
        { label: "Username", name: "userName", error: errors.userName },
        { label: "E-mail", name: "email", type: "email", error: errors.email },
        {
          label: "password",
          name: "password",
          type: "password",
          error: errors.password,
        },
      ]}
      buttonText="Register"
      onSubmit={handleSubmit}
      onChange={handleChange}
      linkText="Already have an account? Log in"
      linkHref="/login"
    />
  );
};

export default Register;
