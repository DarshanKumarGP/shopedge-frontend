// src/pages/Auth/Register.tsx
import React from "react";
import { useRegister } from "../../hooks/useAuth";
import { RegisterForm } from "../../components/forms/RegisterForm/RegisterForm";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const registerMutation = useRegister();
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    try {
      await registerMutation.mutateAsync(data);
      // Redirect to login after successful registration
      navigate("/login");
    } catch {
      // Errors are handled by toast inside hook; nothing to do here.
    }
  };

  return (
    <RegisterForm
      onSubmit={handleSubmit}
      isLoading={registerMutation.isPending}
      error={registerMutation.error?.message}
    />
  );
};

export default RegisterPage;
