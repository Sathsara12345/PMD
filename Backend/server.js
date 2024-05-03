import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from 'body-parser';


const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'pdm'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); 
    }
    console.log('Connected to MySQL database');
});

// Route to handle signup form submission
app.post('/signup', (req, res) => {
    const { email, username, password,role } = req.body;
    const sql = "INSERT INTO users (`email`, `username`, `password`, `role`) VALUES (?, ?, ?,?)";
    const values = [email, username, password,role];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Data inserted successfully:', result);
        return res.json({ success: true });
    });
});

// Close MySQL connection when the application exits
process.on('exit', () => {
    console.log('Closing MySQL connection');
    db.end();
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    const values = [email, password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.length === 0) {
            // User not found or credentials invalid
            return res.json({ success: false, error: 'Invalid credentials' });
        } else {
            // User found and credentials valid
            return res.json({ success: true, user: result[0] });
        }
    });

});

app.use(bodyParser.json());

// Routes
// Get all mechanics
app.get('/fetchMechanics', (req, res) => {
  const sql = 'SELECT * FROM mechanics';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching mechanics:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(result);
  });
});

// Add new mechanic
app.post('/addMechanic', (req, res) => {
  const { name, specialty, contact, email } = req.body;
  const sql = 'INSERT INTO mechanics (name, specialty, contact,email) VALUES (?, ?, ?, ?)';
  const values = [name, specialty, contact, email];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding mechanic:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ success: true, message: 'Mechanic added successfully' });
  });
});

// Update mechanic
// Backend code

// Update mechanic
app.put('/updateMechanic/:id', (req, res) => {
  const id = req.params.id;
  const { name, specialty, contact, email } = req.body;
  const sql = 'UPDATE mechanics SET name = ?, specialty = ?, contact = ?, email = ? WHERE id = ?';
  const values = [name, specialty, contact, email, id];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating mechanic:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ success: true, message: 'Mechanic updated successfully' });
  });
});

// Delete mechanic
app.delete('/deleteMechanic/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM mechanics WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting mechanic:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ success: true, message: 'Mechanic deleted successfully' });
  });
});



app.post('/storedata', (req, res) => {
    const { Type, Air_temperature_K, Process_temperature_K, Rotational_speed_rpm, Torque_Nm, Tool_wear_min, target_prediction, failure_prediction } = req.body;
    
    const sql = `INSERT INTO predictions (Type, Air_temperature_K, Process_temperature_K, Rotational_speed_rpm, Torque_Nm, Tool_wear_min, target_prediction, failure_prediction) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [Type, Air_temperature_K, Process_temperature_K, Rotational_speed_rpm, Torque_Nm, Tool_wear_min, target_prediction, failure_prediction], (err, result) => {
      if (err) {
        console.error('Error storing data:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log('Data stored successfully');
        res.status(200).json({ message: 'Data stored successfully' });
      }
    });
  });
  
  app.post('/filterMechanicsBySpecialty', (req, res) => {
    const { specialty } = req.body;
    const query = 'SELECT * FROM mechanics WHERE specialty = ?';
    db.query(query, [specialty], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });
  });

  app.get('/mechanics/count', (req, res) => {
    const sql = 'SELECT COUNT(*) AS count FROM mechanics';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      return res.json({ count: result[0].count });
    });
  });

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
