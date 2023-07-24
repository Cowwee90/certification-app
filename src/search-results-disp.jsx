import React from "react";
import "./app.css";


export const SearchResult =({results}) => {
return(
  <div className="search-result">
{results.name}
</div>);
};
