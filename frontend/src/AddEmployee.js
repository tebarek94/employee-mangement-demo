import React, { useState } from "react";
import axios from "axios";
import "./AddEmployee.css";
import { Link } from "react-router-dom";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !position) {
      setError("Name and position are required."); // Corrected error message
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/addemployee", {
        name,
        position,
      });
      console.log("Employee added:", response.data);
      setError(""); // Clear error message on success
    } catch (err) {
      console.error(err.response?.data || "An error occurred");
      setError(err.response?.data.error || "Failed to add employee.");
    }
  };

  return (
    <div className="form-container">
      <h1>Add Employee</h1>
      {error && <p className="error-message">{error}</p>} {/* Error Message */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <button type="submit">
          <Link to="/deleteemployee">Add Employee</Link>
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
