import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://reqres.in/api/users?page=${pageNumber}`)
      .then((res) => res.json())
      .then((body) => {
        setIsLoading(false);
        setUsers(body.data);
      });
  }, [pageNumber]);

  const tableHeader = (
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Avatar</th>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Email</th>
      </tr>
    </thead>
  );

  const tableBody = (
    <tbody>
      {users.map((u, idx) => {
        return (
          <tr key={u.id}>
            <th scope="row">{idx + 1}</th>
            <td>
              <img className="avatar" src={u.avatar} alt={u.first_name}></img>
            </td>
            <td>{u.first_name}</td>
            <td>{u.last_name}</td>
            <td className="email">{u.email}</td>
          </tr>
        );
      })}
    </tbody>
  );

  return (
    <>
      {isLoading && <div className="h5 mx-auto">Loading...</div>}

      {!isLoading && (
        <div className="mx-auto user-list">
          <table className="table table-striped table-bordered">
            {tableHeader}
            {tableBody}
          </table>
        </div>
      )}

      {!isLoading && (
        <div className="mx-auto mt-5">
          <button
            className="btn-dark px-3 rounded"
            onClick={() => {
              if (pageNumber !== 1) {
                setPageNumber(1);
              }
            }}
          >
            1
          </button>
          <button
            className="btn-dark px-3 rounded ms-5"
            onClick={() => {
              if (pageNumber !== 2) {
                setPageNumber(2);
              }
            }}
          >
            2
          </button>
        </div>
      )}
    </>
  );
};

export default App;
