import { createContext, useContext, useState } from "react";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch(): SearchContextType {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch deve ser usado dentro de um SearchProvider.");
  }
  return context;
}
