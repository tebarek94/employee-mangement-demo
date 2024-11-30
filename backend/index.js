import express from "express";
import db from "./databse.js";
import cors from "cors";
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.get("/employee", (req, res) => {
  // SQL query to select all employee records
  const query = "SELECT * FROM employee_info";
  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching employee data: " + err.stack);
      return res.status(500).send("Error fetching employee data");
    }
    // Send the results as a JSON response
    res.json(results);
  });
});
app.post("/addemployee", (req, res) => {
  const { name, position } = req.body;

  // Validate input
  if (!name || !position) {
    return res
      .status(400)
      .json({ error: "You must provide both name and position." });
  }

  // Correct SQL syntax and placeholders
  const addEmployeeQuery =
    "INSERT INTO employee_info (name, position) VALUES (?, ?)";
  const values = [name, position];

  // Database query
  db.query(addEmployeeQuery, values, (err, result) => {
    if (err) {
      console.error("Database error:", err); // Improved error handling
      return res
        .status(500)
        .json({ error: "An error occurred while adding the employee." });
    }
    res
      .status(201)
      .json({ message: "Employee added successfully!", data: result });
  });
});

app.delete("/deleteemployee/:id", (req, res) => {
  const { id } = req.params;

  // Validate the input
  if (!id) {
    return res.status(400).json({ error: "Employee ID is required." });
  }

  // SQL query to delete the employee
  const deleteEmployeeQuery = "DELETE FROM users WHERE id = ?";

  db.query(deleteEmployeeQuery, [id], (err, result) => {
    if (err) {
      console.error("Database error:", err); // Log the error for debugging
      return res
        .status(500)
        .json({ error: "An error occurred while deleting the employee." });
    }

    // Check if any row was deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found." });
    }

    res.status(200).json({ message: "Employee deleted successfully!" });
  });
});

// Establish the connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the database as id " + db.threadId);
});

// Example route to fetch employee data
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employee_info", (err, results) => {
    if (err) {
      console.error("Error fetching data: " + err.stack);
      return res.status(500).send("Error fetching data");
    }
    res.json(results); // Return the results as a JSON response
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
