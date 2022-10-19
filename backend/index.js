require("dotenv").config();
const express = require('express');
const mysql2 = require('mysql2');
const app = express();
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const port = process.env.NODE_DOCKER_PORT || 8080;

const createUsersTable = 'CREATE TABLE IF NOT EXISTS users (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL)';
const createItemsTable = 'CREATE TABLE IF NOT EXISTS items (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, userId INT NOT NULL, itemName VARCHAR(100) NOT NULL, itemPrice VARCHAR(100) NOT NULL, itemType VARCHAR(100) NOT NULL, itemCategory VARCHAR(100) NOT NULL, itemOpenDate DATE NOT NULL, customItemUseDeadline INT, comment VARCHAR(100) NOT NULL)';

const config = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

config.connect();

// SMTP設定
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.TEST_MAIL_USER,
        pass: process.env.TEST_MAIL_PASS,
    },
});

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

app.post('/sendEmail', (req, res) => {
    const itemId = req.body.itemId;
    const itemName = req.body.itemName;

    const data = {
        from: process.env.TEST_MAIL_FROM,
        to: process.env.TEST_MAIL_TO,
        text: `itemId${itemId}の${itemName}が期限切れです。`,
        html: `itemId${itemId}の${itemName}が期限切れです。`,
        subject: 'メール件名',
    };

    transporter.sendMail(data, (err, info) => {
        if (err) throw err;
        
        console.log(info);
    })
});

app.post('/check', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const data = [name, email];
    const sql = 'SELECT * FROM users WHERE name = ? AND email = ?';

    config.query(sql, data , (err, rows) => {
        if (err) throw err;

        const resultRow = rows.find(async (row) => {
            const bool = await bcryptjs.compare(req.body.password, row.password);
            return bool === true;
        });

        if (rows.length === 0 && resultRow === undefined) {
            res.send(JSON.stringify({"status": 200, "error": null, "response": 'そのデータはまだ存在しないよ！'}));
        }
    });

});

app.post('/signUp', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
    const data = [name, email, hashedPassword];
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
    const data = [email];
    const sql = 'SELECT * FROM users WHERE email = ?';
    config.query(sql, data, (err, rows) => {
        if(err) throw err;

        if (rows.length === 0) {
            res.send(JSON.stringify({"status": 503, "error": null, "response": 'サインイン失敗...。'}));
        } else {
            const resultRow = rows.find(async (row) => {
                console.log(row);
                const bool = await bcryptjs.compare(req.body.password, row.password);
                return bool === true;
            });

            res.send(JSON.stringify({"status": 200, "error": null, "response": resultRow}));
        }

    });
});

app.post('/registerItem', (req, res) => {
    req.body.forEach(request => {
        const userId = request.userId;
        const itemName = request.itemName;
        const itemPrice = request.itemPrice;
        const itemType = request.itemType;
        const itemCategory = request.itemCategory;
        const customItemUseDeadline = request.customItemUseDeadline === '' ? 0 : request.customItemUseDeadline;
        const comment = request.comment;

        const now = new Date();
        const itemOpenDate = now;
        const data = [userId, itemName, itemPrice, itemType, itemCategory, itemOpenDate, customItemUseDeadline, comment];
        const sql = 'INSERT INTO items(userId, itemName, itemPrice, itemType, itemCategory, itemOpenDate, customItemUseDeadline, comment) VALUES(?, ?, ?, ?, ?, ?, ?, ?);';

        config.query(sql, data, (err, results) => {
            if (err) throw err;
            res.send(JSON.stringify({
                'status': 200,
                'error': null,
                'response': results
            }));
        });
    });
});

app.post('/getItems', (req, res) => {
    const userId = req.body.userId;
    const data = [userId];
    const sql = "SELECT * FROM items WHERE userId = ?";

    config.query(sql, data, (err, rows) => {
        if(err) throw err;

        if (rows.length === 0) {
            res.send(JSON.stringify({"status": 503, "error": null, "response": '取得失敗...。'}));
        } else {
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": rows
            }));
        }
    });
});

app.post('/getItem', (req, res) => {
    const userId = req.body.userId;
    const itemId = req.body.itemId;
    const data = [userId, itemId];
    const sql = "SELECT * FROM items WHERE userId = ? AND id = ?";

    config.query(sql, data, (err, rows) => {
        if(err) throw err;

        if (rows.length === 0) {
            res.send(JSON.stringify({"status": 503, "error": null, "response": '取得失敗...。'}));
        } else {
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": rows[0]
            }));
        }
    });
});

app.post('/deleteItems', (req, res) => {
    const userId = req.body.userId;
    const itemId = req.body.itemId;
    const data = [userId, itemId];
    const sql = 'DELETE FROM items WHERE userId = ? AND id = ?';

    config.query(sql, data, (err, results) => {
        if(err) throw err;

        res.send(JSON.stringify({
            'status': 200,
            'error': null,
            'response': results
        }));
    });

});

app.post('/filtering', (req, res) => {
    const keywords = req.body.keywords;
    const userId = req.body.userId;
    const sql = 'SELECT * FROM items WHERE userId = ? AND itemCategory IN (?)';

    const data = [userId, keywords];
    config.query(sql, data, (err, rows) => {
        if(err) throw err;

        if (rows.length === 0) {
            res.send(JSON.stringify({"status": 503, "error": null, "response": '取得失敗...。'}));
        } else {
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": rows
            }));
        }
    });
});

app.post('/updateItemData', (req, res) => {
    const itemName = req.body.itemName;
    const itemPrice = req.body.itemPrice;
    const itemType = req.body.itemType;
    const itemCategory = req.body.itemCategory;
    const customItemUseDeadline = req.body.customItemUseDeadline === '' ? 0 : req.body.customItemUseDeadline;
    const comment = req.body.comment;
    const userId = req.body.userId;
    const itemId = req.body.itemId;
    const data = [itemName, itemPrice, itemType, itemCategory, customItemUseDeadline, comment, userId, itemId];
    const sql = 'UPDATE items SET itemName = ?, itemPrice = ?, itemType = ?, itemCategory = ?, customItemUseDeadline = ?, comment = ? WHERE userId = ? AND id = ?';

    config.query(sql, data, (err, rows) => {
        if(err) throw err;

        if (rows.length === 0) {
            res.send(JSON.stringify({"status": 503, "error": null, "response": '更新失敗...。'}));
        } else {
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": rows
            }));
        }
    });
});

app.post('/updateUserData', (req, res) => {
    const newName = req.body.name;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    const userId = req.body.userId
    const data = [newName, newEmail, newPassword, userId];
    const sql = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';

    config.query(sql, data, (err, rows) => {
        if(err) throw err;

        if (rows.length === 0) {
            res.send(JSON.stringify({"status": 503, "error": null, "response": '更新失敗...。'}));
        } else {
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": rows
            }));
        }
    });
});
  
app.listen(port, () => {
    console.log(`listening on *:${port}`);
});