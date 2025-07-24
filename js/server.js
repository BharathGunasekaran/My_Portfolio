const http = require('http');
const https = require('https');

const FORM_ENDPOINT = 'https://formspree.io/f/your-form-id'; // 🔁 Replace with your actual Formspree form ID

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/contact') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const { name, email, subject, message } = JSON.parse(body);

                if (!name || !email || !subject || !message) {
                    res.writeHead(400);
                    return res.end('All fields are required');
                }

                const postData = JSON.stringify({
                    name,
                    email,
                    subject,
                    message
                });

                const formspreeReq = https.request(FORM_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(postData),
                        'Accept': 'application/json'
                    }
                }, formspreeRes => {
                    let responseData = '';
                    formspreeRes.on('data', chunk => responseData += chunk);
                    formspreeRes.on('end', () => {
                        if (formspreeRes.statusCode === 200) {
                            res.writeHead(200);
                            res.end('Message submitted successfully');
                        } else {
                            res.writeHead(formspreeRes.statusCode);
                            res.end('Failed to forward message to Formspree');
                        }
                    });
                });

                formspreeReq.on('error', err => {
                    console.error('❌ Forwarding error:', err);
                    res.writeHead(500);
                    res.end('Internal error');
                });

                formspreeReq.write(postData);
                formspreeReq.end();

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

server.listen(3000, () => {
    console.log('🚀 Server running at http://127.0.0.1:3000/');
});
