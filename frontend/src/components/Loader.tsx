import { LoaderCircle } from "lucide-react";

interface LoaderProps {
  className?: string;
  size?: number;
}

const Loader = ({ className, size = 24 }: LoaderProps) => {
  return <LoaderCircle size={size} className={`animate-spin mx-auto ${className}`} />;
};

export default Loader;
