"use client";
import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";
import { useState } from "react";
import { AuthRequest } from "@/lib/api/clientApi";
import { register } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const handleRegister = async (formData: FormData) => {
    try {
      const payload: AuthRequest = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };
      const res = await register(payload);
      if (res) {
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid Email or Password");
      }
    } catch {
      setError("Invalid Email or Password");
    }
  };
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleRegister}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUp;
