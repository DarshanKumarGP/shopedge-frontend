// src/pages/Auth/Register.tsx
import React from "react";
import { useRegister } from "../../hooks/useAuth";
import { RegisterForm } from "../../components/forms/RegisterForm/RegisterForm";

const RegisterPage: React.FC = () => {
  const registerMutation = useRegister();

  const handleSubmit = async (data: any) => {
    await registerMutation.mutateAsync(data);
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
