import { Link, useNavigate } from "react-router-dom";
import Dialog from "../components/Dialog";
import AuthForm from "../components/AuthForm";
import { useSignupMutation } from "../redux/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export default function SignupPage() {
  const [signup, { isLoading, error }] = useSignupMutation();
  const navigate = useNavigate();

  const handleSignup = async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => {
    await signup({
      email,
      password,
      firstName: firstName!,
      lastName: lastName!,
    }).unwrap();
    navigate("/");
  };

  return (
    <Dialog isOpen={true} onClose={() => {}}>
      <AuthForm
        onSubmit={handleSignup}
        isLoading={isLoading}
        error={
          ((error as FetchBaseQueryError)?.data as { message?: string })
            ?.message || (error as SerializedError)?.message
        }
      />
      <p style={{ textAlign: "center" }}>
        Already registered? <Link to="/login">Login!</Link>
      </p>
    </Dialog>
  );
}
