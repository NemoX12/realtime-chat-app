import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

import FormInput from "../components/Form/FormInput";
import FormButton from "../components/Form/FormButton";
import { useAuthStore } from "../store/useAuthStore";
import FormDistraction from "../components/Form/FormDistraction";
import { SignUpSchema } from "../lib/schemas/schemas";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState<z.core.$ZodIssue[] | null>(null);

  const navigate = useNavigate();

  const { signUp, isSigningUp } = useAuthStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validated = z.safeParse(SignUpSchema, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    });

    if (validated.error) {
      setFormError(validated.error.issues);
      return;
    }

    signUp({
      firstName: validated.data.firstName,
      lastName: validated.data.lastName,
      email: validated.data.email,
      password: validated.data.password,
    });
  };

  return (
    <div className="w-full max-w-10/12 md:max-w-5xl bg-secondary_dark rounded-xl p-10 md:p-20 flex md:flex-row flex-col justify-between">
      <div className="flex flex-col w-full max-w-lg md:max-w-xs items-center justify-center gap-6">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center gap-10 w-full my-6.5">
            <FormInput
              placeholder="First Name"
              inputFor="firstName"
              formData={formData}
              setFormData={setFormData}
              formError={formError}
            />
            <FormInput
              placeholder="Last Name"
              inputFor="lastName"
              formData={formData}
              setFormData={setFormData}
              formError={formError}
            />
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
          <FormButton placeholder="Sign Up" loading={isSigningUp} />
        </form>
        <p className="text-label-text text-sm sm:text-md text-center">
          Already have an account?{" "}
          <span
            className="text-label-brighter-text font-bold cursor-pointer hover:text-label-text"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </p>
      </div>
      <FormDistraction
        header="Become a part of us today!"
        description="Join millions of users right now"
      />
    </div>
  );
};

export default SignUp;
