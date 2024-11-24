const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'mydb'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Database connected.');
    }
});

// User model
const User = {
    create: async (username, email, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                [username, email, hashedPassword],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        });
    },

    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    }
};

module.exports = User;
