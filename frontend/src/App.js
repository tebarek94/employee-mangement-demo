import AddEmployee from "./AddEmployee";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EmployeeList from "./EmployeeList";

function App() {
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
    color: "#000",
    fontWeight: "bold",
  };

  return (
    <BrowserRouter>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link to="/deleteemployee" exact style={linkStyle}>
            Home
          </Link>
        </li>
        <li style={liStyle}>
          <Link to="/addemployee" style={linkStyle}>
            Add Employee
          </Link>
        </li>
      </ul>
      <Routes>
        <Route path="/addemployee" element={<AddEmployee />} />
        <Route path="/deleteemployee" element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
