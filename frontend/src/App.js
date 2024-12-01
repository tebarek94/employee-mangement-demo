import AddEmployee from "./AddEmployee";
import EmployeeList from "./EmployeeList";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  const homeStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    textAlign: "center",
  };

  const buttonStyle = {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    textDecoration: "none",
  };

  return (
    <div style={homeStyle}>
      <h1>Welcome to Employee Management System</h1>
      <p>
        This application allows you to manage employee records efficiently. Use
        the navigation menu to add a new employee or view and delete existing
        employees.
      </p>
      <Link to="/addemployee" style={buttonStyle}>
        Get Started
      </Link>
    </div>
  );
}

function App() {
  const navContainerStyle = {
    display: "flex",
    justifyContent: "center",
    background: "#f8f8f8",
    borderBottom: "1px solid #ddd",
    padding: "10px 0",
  };

  const ulStyle = {
    listStyleType: "none",
    padding: "0",
    margin: "0",
    display: "flex",
  };

  const liStyle = {
    marginRight: "20px",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#007BFF",
    fontWeight: "bold",
  };

  return (
    <BrowserRouter>
      <div style={navContainerStyle}>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <Link to="/" style={linkStyle}>
              Home
            </Link>
          </li>
          <li style={liStyle}>
            <Link to="/addemployee" style={linkStyle}>
              Add Employee
            </Link>
          </li>
          <li style={liStyle}>
            <Link to="/deleteemployee" style={linkStyle}>
              Manage Employees
            </Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addemployee" element={<AddEmployee />} />
        <Route path="/deleteemployee" element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
