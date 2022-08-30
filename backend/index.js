require("dotenv").config();
const express = require('express');
const mysql2 = require('mysql2');
const app = express();
const cors = require('cors');
const port = process.env.NODE_DOCKER_PORT || 8080;

const createUsersTable = 'CREATE TABLE IF NOT EXISTS users (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL)';
const createItemsTable = 'CREATE TABLE IF NOT EXISTS items (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, itemName VARCHAR(100) NOT NULL, itemPrice VARCHAR(100) NOT NULL, itemType VARCHAR(100) NOT NULL, itemCategory VARCHAR(100) NOT NULL, comment VARCHAR(100) NOT NULL)';

const config = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

config.connect();

config.query(createUsersTable);
config.query(createItemsTable);

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

app.post('/check', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const data = [name, email, password];
    const sql = 'SELECT * FROM users WHERE name = ? AND email = ? AND password = ?';

    config.query(sql, data , (err, rows, result) => {
        if (err) throw err;

        if (rows.length === 0) {
            res.send(JSON.stringify({"status": 200, "error": null, "response": 'そのデータはまだ存在しないよ！'}));
        }
    });

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

app.post('/signIn', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const data = [email, password];
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    config.query(sql, data, (err, rows, result) => {
        if(err) throw err;

        if (rows.length === 0) {
            res.send(JSON.stringify({"status": 503, "error": null, "response": 'サインイン失敗...。'}));
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": rows[0]}));
        }

    });
});

app.post('/registerItem', (req, res) => {
    req.body.forEach(request => {
        const itemName = request.itemName;
        const itemPrice = request.itemPrice;
        const itemType = request.itemType;
        const itemCategory = request.itemCategory;
        const comment = request.comment;
        const data = [itemName, itemPrice, itemType, itemCategory, comment];
        const sql = 'INSERT INTO items(itemName, itemPrice, itemType, itemCategory, comment) VALUES(?, ?, ?, ?, ?)';

        config.query(sql, data, (err, results) => {
            if (err) throw err;
            res.send(JSON.stringify({
                'status': 200,
                'error': null,
                'response': results
            }));
        });
    });
})
  
app.listen(port, () => {
    console.log(`listening on *:${port}`);
});