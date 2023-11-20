import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  function getData() {
    axios
      .get(
        "https://65574f0cbd4bcef8b6126aca.mockapi.io/crud-operations-mock-api"
      )
      .then((res) => {
        setData(res.data);
      });
  }

  function handleDelete(id) {
    axios
      .delete(
        `https://65574f0cbd4bcef8b6126aca.mockapi.io/crud-operations-mock-api/${id}`
      )
      .then(() => {
        const updateData = data.filter((item) => item.id !== id);
        setData(updateData);
      });
  }

  function setToLocalStorage(id, name, email) {
    const dataObject = {
      id: id,
      name: name,
      email: email,
    };

    const dataToString = JSON.stringify(dataObject);

    localStorage.setItem("editData", dataToString);
  }

  return (
    <>
      <h2>Read Operation</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sl.no</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {/* {console.log(typeof data)} */}
          {data.map((item) => (
            <tr key={item.id}>
              <td className="align-middle">{item.id}</td>
              <td className="align-middle">{item.name}</td>
              <td className="align-middle">{item.email}</td>
              <td>
                <Link to="/update">
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      setToLocalStorage(item.id, item.name, item.email)
                    }
                  >
                    Edit
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Read;
