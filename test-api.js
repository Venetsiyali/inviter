const http = require('http');

const payload = JSON.stringify({
    eventType: "wedding",
    title: "Test API Event",
    date: "2023-11-20T12:00",
    location: "Tashkent",
    description: "API testing",
    aiDesign: null
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/events',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length
    }
};

const req = http.request(options, (res) => {
    let data = '';

    console.log('Status Code:', res.statusCode);

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Response:', data);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(payload);
req.end();
