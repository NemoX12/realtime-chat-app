import type { core } from "zod";

interface HandleZodErrorProps {
  errors: core.$ZodIssue[];
  input: string;
}

const HandleZodError = ({ errors, input }: HandleZodErrorProps) => {
  const issue = errors.find((error) => error.path[0] === input);

  if (!issue) return null;

  return issue.message;
};

export default HandleZodError;
