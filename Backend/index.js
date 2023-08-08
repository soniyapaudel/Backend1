const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'soniya123@',
    database: 'login_form'
});

app.use(cors());
app.use(express.json());


app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM login_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post('/api/post', (req, res) => {
    const { username, password } = req.body;
    const sqlInsert = "INSERT INTO login_db (username, password) VALUES (?, ?)";
    
    db.query(sqlInsert, [username, password], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Failed to insert data' });
        } else {
            console.log('Data inserted successfully:', result);
            res.json({ message: 'Registration successful' });
        }
    });
});

app.get('/api/users', (req, res) => {
    const sqlGet = "SELECT * FROM login_db";
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Failed to fetch users' });
        } else {
            res.json(result);
        }
    });
});

const PORT = 4000;
const HOST = 'localhost'; 
app.listen(PORT, HOST, () => {
    console.log(`Your server is running on port ${PORT}`);
});
