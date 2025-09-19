import { createContext } from "react";

interface PageProps {
  screen: Record<string, number>;
  selectedPage: string;
  setSelectedPage: React.Dispatch<React.SetStateAction<"add" | "manage">>;
}

export const PageContext = createContext<PageProps | null>(null);
