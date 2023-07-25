import React from "react";
import { SearchResult } from "./search-results-disp.jsx";

export const SearchResultsList = ({ results }) => {
  return (
    <div>
      {results.map((results, id) => {
        return (
          <SearchResult className="search-result" results={results} key={id}/>
        );
      })}
    </div>
  );
};
