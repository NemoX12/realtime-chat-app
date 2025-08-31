import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import { useAuthStore } from "../store/useAuthStore";
import FormDistraction from "../components/FormDistraction";
import { SignInSchema } from "../lib/schemas";

const SignIn = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState<z.core.$ZodIssue[] | null>(null);

  const navigate = useNavigate();

  const { signIn, isSigningIn } = useAuthStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validated = z.safeParse(SignInSchema, {
      email: formData.email,
      password: formData.password,
    });

    if (validated.error) {
      setFormError(validated.error.issues);
      return;
    }

    signIn({ email: validated.data.email, password: validated.data.password });
  };

  return (
    <div className="w-full max-w-5xl bg-secondary_dark rounded-xl p-20 flex justify-between">
      <div className="flex flex-col items-center justify-center gap-6">
        <form className="flex flex-col items-center gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-10">
            <FormInput
              placeholder="Email"
              inputFor="email"
              formData={formData}
              setFormData={setFormData}
              formError={formError}
            />
            <FormInput
              placeholder="Password"
              inputFor="password"
              formData={formData}
              setFormData={setFormData}
              formError={formError}
            />
          </div>
          <FormButton placeholder="Sign In" loading={isSigningIn} />
        </form>
        <div>
          <p className="text-label-brighter-text hover:text-label-text text-md font-bold text-center duration-150 cursor-pointer">
            Forgot a password
          </p>
          <p className="text-label-text text-md text-center mt-4">
            Don't have an account?{" "}
            <span
              className="text-label-brighter-text font-bold cursor-pointer hover:text-label-text"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
      <FormDistraction
        header="Welcome back!"
        description="We have been waiting you so long"
      />
    </div>
  );
};

export default SignIn;
