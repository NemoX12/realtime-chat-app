import { useState, useEffect } from "react";
import type { core } from "zod";
import HandleZodError from "../lib/handleZodError";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface FormInputProps {
  placeholder: string;
  inputFor: keyof FormData;
  formData: FormData;
  setFormData: (value: React.SetStateAction<FormData>) => void;
  formError: core.$ZodIssue[] | null;
}

const FormInput = ({
  placeholder,
  inputFor,
  formData,
  setFormData,
  formError,
}: FormInputProps) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (formError) {
      const res = HandleZodError({ errors: formError, input: inputFor });
      setError(res);
    }
  }, [formError, inputFor]);

  return (
    <div className="my-1">
      <div className="relative">
        <input
          id={`${inputFor}_input`}
          placeholder=" "
          autoComplete="off"
          autoCorrect="off"
          type="text"
          value={formData[inputFor]}
          className={`peer w-[300px] h-[52px] rounded-sm border 
            transition-all duration-150
            ${error ? "border-red-500" : "border-gray-500"} 
            bg-spec-1-dark p-3 text-sm text-input-text 
            ${error ? "focus:border-red-400" : "focus:border-label-text"}
            focus:outline-none`}
          onChange={(e) => {
            setFormData((prev: FormData) => ({
              ...prev,
              [inputFor]: e.target.value,
            }));
          }}
        />
        <label
          htmlFor={`${inputFor}_input`}
          className={`absolute left-3 ${
            error ? "text-red-400" : "text-label-text"
          } transition-all duration-150 top-1/ -translate-y-1/2 text-sm peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:text-xs`}
        >
          {placeholder}
        </label>
      </div>
      <p className="mt-1 absolute text-red-400 text-sm">{error}</p>
    </div>
  );
};

export default FormInput;
