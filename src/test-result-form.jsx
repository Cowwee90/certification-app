import { useState } from "react";

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

  const onChange = (e) => {
    setQuery(e.target.value);
    setResults(e.target.value);
  };

  // const data = results.map((student) => {
  //   return (
  //     <tr key={student.id}>
  //       <td>{student.id}</td>
  //       <td>{student.sname}</td>
  //       <td>{student.birthday}</td>
  //     </tr>
  //   );
  // });

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={onChange}
        placeholder="Search Students"
      />
      {/* <button onClick={handleSearch}>Search</button> */}
      <div>
        {allResults.map((item) => (
          <div>{item.sname}</div>
        ))}
      </div>
      {/* <table>
        <tbody>{data}</tbody>
      </table> */}
    </div>
  );
}
