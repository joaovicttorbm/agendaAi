import { useState } from "react";
import { login } from "../services/authService.ts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import AuthForm from "../components/AuthForm.tsx";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const validateCredentials = (email: string, password: string) => {
    const errors = { email: "", password: "" };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email inválido";
    }

    if (password.length < 8) {
      errors.password = "Senha deve ter pelo menos 8 caracteres";
    }

    return errors;
  };

  const handleLogin = async () => {
    const { email, password } = credentials;
    const validationErrors = validateCredentials(email, password);

    if (validationErrors.email || validationErrors.password) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 50));
      const userData = await login(email, password);
      authLogin(userData);
      navigate("/dashboard");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        password: "Login failed. Please check your credentials.",
      }));
      console.error("Error login", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="Login"
      fields={[
        { label: "Email", name: "email", error: errors.email },
        {
          label: "Password",
          name: "password",
          type: "password",
          error: errors.password,
        },
      ]}
      buttonText="Access account"
      onSubmit={handleLogin}
      onChange={(name: string, value: any) => {
        setCredentials((prev) => ({ ...prev, [name]: value }));
      }}
      linkText="Don't have an account? Create account"
      linkHref="/register"
      loading={loading}
    />
  );
};

export default Login;
