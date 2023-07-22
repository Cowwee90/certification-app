export function SearchTable() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "User-Agent": "testingAgent", // not necessary
        };
        const response = await fetch(
          "https://certification-api.glitch.me/students",
          {
            headers,
          }
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div class="student-table">
      {data ? (
        //<pre>{JSON.stringify(data, null, 2)}</pre>
        showJsonInTable(data)
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

function showJsonInTable(JsonData) {
  const DisplayData = JsonData.map((info) => {
    return (
      <tr>
        <td>{info.id}</td>
        <td>{info.sname}</td>
        <td>{info.birthday}</td>
        <td>{info.highest_level}</td>
        <td>{info.best_grade}</td>
        <td>
          <a href="anse1.com">
            <FontAwesomeIcon icon={faPencil} />
          </a>
        </td>
      </tr>
    );
  });
}
