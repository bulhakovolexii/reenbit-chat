import { FormEvent } from "react";
import classes from "./AuthForm.module.css";

interface AuthFormProps {
  isLogin?: boolean;
  onSubmit: (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => void;
  isLoading?: boolean;
  error?: string;
}

export default function AuthForm({
  isLogin,
  onSubmit,
  isLoading,
  error,
}: AuthFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (isLogin) {
      onSubmit(email, password);
    } else {
      const firstName = formData.get("firstName") as string;
      const lastName = formData.get("lastName") as string;
      onSubmit(email, password, firstName, lastName);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      {!isLogin && (
        <>
          <div className={classes.field}>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" required />
          </div>
          <div className={classes.field}>
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" required />
          </div>
        </>
      )}
      <div className={classes.field}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={isLogin ? "demo@user.com" : ""}
          required
        />
      </div>
      <div className={classes.field}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          defaultValue={isLogin ? "123456" : ""}
          required
        />
      </div>
      {error && <div className={classes.error}>{error}</div>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
      </button>
    </form>
  );
}
