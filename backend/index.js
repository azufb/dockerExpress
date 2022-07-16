require("dotenv").config();
const express = require('express');
const mysql2 = require('mysql2');
const app = express();
const cors = require('cors');
const port = process.env.NODE_DOCKER_PORT || 8080;

const config = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

config.connect();

app.use(cors());
app.options('*', cors());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET");
    res.setHeader("Access-Control-Max-Age", "3600");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, x-access-token, x-user-id,Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!!' })
});

app.post('/api', (req, res) => {
    res.send('Got a POST request');
});

app.post('/signUp', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const data = [name, email, password];
    const sql = 'INSERT INTO users(name, email, password) VALUES(?, ?, ?)';

    config.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            'status': 200,
            'error': null,
            'response': results
        }));
    });
});

app.post('signIn', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const data = [email, password];
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    config.query(sql, data, (err, rows, results) => {
        if(err) throw err;

        if (rows.length === 0) {
            res.send(JSON.stringify({"status": 503, "error": null, "response": 'サインイン失敗...。'}));
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": 'サインイン成功！'}));
        }

    });
})
  
app.listen(port, () => {
    console.log(`listening on *:${port}`);
});