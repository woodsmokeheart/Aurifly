import React from "react";

import css from "./Search.module.css";

interface SearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const Search = ({ searchQuery, setSearchQuery }: SearchProps) => {
  return (
    <div className={css.searchContainer}>
      <input
        type="text"
        placeholder="Search tracks..."
        className={css.searchInput}
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
      />
    </div>
  );
};
