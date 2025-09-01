import Loader from "../Loader";

interface FormButtonProps {
  placeholder: string;
  loading: boolean;
}

const FormButton = ({ placeholder, loading }: FormButtonProps) => {
  return (
    <button
      type="submit"
      className="w-[300px] h-[52px] duration-150 transition-all cursor-pointer rounded-sm bg-label-text text-spec-1-dark hover:bg-spec-1-dark hover:text-label-text font-semibold"
    >
      {loading ? <Loader size={24} /> : placeholder}
    </button>
  );
};

export default FormButton;
