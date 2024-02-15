import { createContext, useState, useContext } from "react";

export const SearchContext = createContext(null);

export const useSearch = () => {
  const search = useContext(SearchContext);
  return search;
};

export const SearchProvider = (props) => {
  const [searchPlace, setSearchPlace] = useState(null);
  return (
    <SearchContext.Provider value={{ searchPlace, setSearchPlace }}>
      {props.children}
    </SearchContext.Provider>
  );
};
