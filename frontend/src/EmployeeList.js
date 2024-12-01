import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null); // To track the employee being edited

  // Fetch employee data
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/employee")
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching employee data:", err);
        setError("Failed to fetch employee data");
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete(`http://localhost:5000/deleteemployee/${id}`)
        .then((response) => {
          alert(response.data.message);
          fetchEmployees(); // Refresh the list after deletion
        })
        .catch((err) => {
          console.error("Error deleting employee:", err);
          alert("Failed to delete the employee.");
        });
    }
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee); // Set the employee being edited
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingEmployee) return;

    axios
      .put(`http://localhost:5000/editemployee/${editingEmployee.id}`, {
        name: editingEmployee.name,
        position: editingEmployee.position,
      })
      .then((response) => {
        alert(response.data.message);
        setEditingEmployee(null); // Close the modal
        fetchEmployees(); // Refresh the employee list
      })
      .catch((err) => {
        console.error("Error updating employee:", err);
        alert("Failed to update the employee.");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div>
      <h1>Employee List</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>
                <button
                  onClick={() => handleDelete(employee.id)}
                  style={{
                    marginRight: "10px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditClick(employee)}
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingEmployee && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          <h2>Edit Employee</h2>
          <form onSubmit={handleEditSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={editingEmployee.name}
                onChange={(e) =>
                  setEditingEmployee({
                    ...editingEmployee,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Position:</label>
              <input
                type="text"
                value={editingEmployee.position}
                onChange={(e) =>
                  setEditingEmployee({
                    ...editingEmployee,
                    position: e.target.value,
                  })
                }
              />
            </div>
            <button type="submit" style={{ marginRight: "10px" }}>
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditingEmployee(null)}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
