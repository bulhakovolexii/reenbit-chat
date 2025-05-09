import { Link, useNavigate } from "react-router-dom";
import Dialog from "../components/Dialog";
import AuthForm from "../components/AuthForm";
import { useLoginMutation } from "../redux/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export default function LoginPage() {
  const [login, { isLoading, error = { message: "" } }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    await login({ email, password }).unwrap();
    navigate("/");
  };

  return (
    <Dialog isOpen={true} onClose={() => {}}>
      <AuthForm
        isLogin
        onSubmit={handleLogin}
        isLoading={isLoading}
        error={
          ((error as FetchBaseQueryError)?.data as { message?: string })
            ?.message || (error as SerializedError)?.message
        }
      />
      <p style={{ textAlign: "center" }}>
        Don't have an account? <Link to="/signup">Sign up!</Link>
      </p>
    </Dialog>
  );
}
