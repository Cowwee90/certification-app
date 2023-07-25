import { useState } from "react";
import { SearchBar } from "./searchbar.jsx";
import { SearchResultsList } from "./search-name-dropdown.jsx";

export function TestResultForm() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const allResults = async () => {
    try {
      const response = await fetch(
        `https://certification-api.glitch.me/students`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://certification-api.glitch.me/students?search_query=${query}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="">
      <SearchBar setResults={setResults} />
      <SearchResultsList results={results} />
    </div>
  );
}
