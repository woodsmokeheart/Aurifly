import React from "react";

import css from "./Search.module.css";

interface SearchProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    placeholder: string;
}

export const Search = ({searchQuery, setSearchQuery, placeholder}: SearchProps) => {
    return (
        <div className={css.searchContainer}>
            <input
                type="text"
                placeholder={placeholder}
                className={css.searchInput}
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                }
            />
        </div>
    );
};
