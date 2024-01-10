const mysql = require('mysql');

// Create MySQL connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'roots',
    password: '',
    database: 'departments'
  });
  const connection1 = mysql.createConnection({
      host: '127.0.0.1',
      user: 'roots',
      password: '',
      database: 'employees'
    });
    const connection2 = mysql.createConnection({
      host: '127.0.0.1',
      user: 'roots',
      password: '',
      database: 'log'
    });

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + connection.threadId);
});

// Create Employees table
const createEmployeesTableQuery = `
  CREATE TABLE Employees (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    DepartmentID INT,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(Id)
  )
`;

connection.query(createEmployeesTableQuery, (error, results) => {
  if (error) throw error;
  console.log('Employees table created');
});

// Create Departments table
const createDepartmentsTableQuery = `
  CREATE TABLE Departments (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
  )
`;

connection.query(createDepartmentsTableQuery, (error, results) => {
  if (error) throw error;
  console.log('Departments table created');
});

// Create Log table
const createLogTableQuery = `
  CREATE TABLE Log (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    LoginDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

connection.query(createLogTableQuery, (error, results) => {
  if (error) throw error;
  console.log('Log table created');
});

// Close the MySQL connection
connection.end((err) => {
  if (err) {
    console.error('Error closing connection: ' + err.stack);
    return;
  }
  console.log('MySQL connection closed');
});
