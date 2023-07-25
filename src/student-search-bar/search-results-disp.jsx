import React, { useCallback } from "react";
import { SearchBar } from "./searchbar.jsx";
import "../app.css";

export const SearchResult = ({ results }) => {

  return <div className="search-result"
  onClick="">
{results.sname} <br/> {results.birthday} </div>;
};
