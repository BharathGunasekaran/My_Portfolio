// server.js
const http = require('http');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');

// ✅ MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xxxxxxxx',
    database: 'my_portfolio',
});

db.connect(err => {
    if (err) throw err;
    console.log('✅ MySQL connected');
});

// ✅ Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gbharath23092004@gmail.com',
        pass: 'xxxxxxxxxxxx' // Use app password (NOT your Gmail password)
    }
});

// ✅ Create HTTP server
const server = http.createServer((req, res) => {
    // ✅ CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // ✅ Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // ✅ Handle contact form POST request
    if (req.method === 'POST' && req.url === '/contact') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const { name, email, subject, message } = JSON.parse(body);

                // Validate
                if (!name || !email || !subject || !message) {
                    res.writeHead(400);
                    return res.end('All fields are required');
                }

                // Insert into MySQL
                const sql = 'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)';
                db.query(sql, [name, email, subject, message], (err) => {
                    if (err) {
                        console.error('❌ DB Error:', err);
                        res.writeHead(500);
                        return res.end('Database error');
                    }

                    // Send Email
                    const mailOptions = {
                        from: 'gbharath23092004@gmail.com',
                        to: 'bharathking2394@gmail.com',
                        subject: `New Contact: ${subject}`,
                        text: `From: ${name} <${email}>\n\n${message}`
                    };

                    transporter.sendMail(mailOptions, (err) => {
                        if (err) {
                            console.error('❌ Email error:', err);
                            res.writeHead(500);
                            return res.end('Email sending failed');
                        }

                        res.writeHead(200);
                        res.end('Message submitted successfully');
                    });
                });
            } catch (err) {
                console.error('❌ Parse error:', err);
                res.writeHead(400);
                res.end('Invalid JSON');
            }
        });

    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

// ✅ Start the server
server.listen(3000, () => {
    console.log('🚀 Server running at http://127.0.0.1:3000/');
});
