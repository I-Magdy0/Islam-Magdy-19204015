const express = require('express');
const session = require('express-session');
const mysql = require('mysql');

const app = express();

// MySQL connection
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
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + connection.threadId);
});

// Session configuration
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Route for Index screen
app.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.redirect('/dashboard');
  } else {
    res.sendFile(__dirname + '/index.html');
  }
});

// Route for Dashboard screen with session check
app.get('/dashboard', (req, res) => {
  if (req.session.loggedin) {
    res.sendFile(__dirname + '/dashboard.html');
  } else {
    res.redirect('/');
  }
});

// Route for Login History screen with session check
app.get('/loginhistory', (req, res) => {
  if (req.session.loggedin) {
    res.sendFile(__dirname + '/login_history.html');
  } else {
    res.redirect('/');
  }
});

// API endpoint for login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM employees WHERE Username = ? AND Password = ?';
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      res.send(false);
      throw error;
    }
    if (results.length > 0) {
      req.session.loggedin = true; // Set session variable
      const logQuery = 'INSERT INTO log (Username, LoginDate) VALUES (?, NOW())';
      connection.query(logQuery, [username], (logError) => {
        if (logError) {
          throw logError;
        }
        res.send(true);
      });
    } else {
      res.send(false);
    }
  });
});

// API endpoint for logout
app.post('/api/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.send(false);
      throw error;
    }
    res.send(true);
  });
});
app.post('/api/adddepartment', (req, res) => {
    const { departmentName } = req.body;
    const query = 'INSERT INTO departments (Name) VALUES (?)';
    connection.query(query, [departmentName], (error) => {
      if (error) {
        res.send(false);
        throw error;
      }
      res.send(true);
    });
  });
  app.post('/api/adduser', (req, res) => {
    const { username, password, departmentID } = req.body;
    const query = 'INSERT INTO employees (Username, Password, Department_ID) VALUES (?, ?, ?)';
    connection.query(query, [username, password, departmentID], (error) => {
      if (error) {
        res.send(false);
        throw error;
      }
      res.send(true);
    });
  });
  app.post('/api/deleteuser', (req, res) => {
    const { userID } = req.body;
    const query = 'DELETE FROM employees WHERE Id = ?';
    connection.query(query, [userID], (error) => {
      if (error) {
        res.send(false);
        throw error;
      }
      res.send(true);
    });
  });
      



// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
