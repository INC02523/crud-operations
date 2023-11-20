import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const [data, setData] = useState({
    id: 0,
    name: "",
    email: "",
  })

  const navigate = useNavigate();

  useEffect(() => {
    const storedDataString = localStorage.getItem("editData");

    const storedDataObject = JSON.parse(storedDataString);

    setData(storedDataObject);
  }, []);

  function handleUpdate(e) {
    e.preventDefault();
    const {id, name , email} = data;
    axios.put(
      `https://65574f0cbd4bcef8b6126aca.mockapi.io/crud-operations-mock-api/${id}`,
      {
        name: name,
        email: email,
      }
    ).then(() => {
      navigate("/read");
    })
  }
  return (
    <div>
      <h2>Create</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            value={data.name}
            onChange={(e) => setData({...data, name: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={data.email}
            onChange={(e) => setData({...data, email: e.target.value})}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleUpdate}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
