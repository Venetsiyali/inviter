const http = require('http');

http.get('http://localhost:3000/events/create?ai=true&type=wedding', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        // Find the error message in the Next.js dev overlay HTML
        const regex = /data-nextjs-dialog-header="([^"]+)"/;
        const match = data.match(regex);
        if (match) {
            console.log("Error found:", decodeURIComponent(match[1]));
        } else {
            console.log("No specific data-nextjs-dialog-header found.");
            // Print a snippet of where Error might be
            const errIndex = data.indexOf("Error:");
            if (errIndex > -1) {
                console.log(data.substring(errIndex - 50, errIndex + 200));
            } else {
                console.log("Status Code:", res.statusCode);
            }
        }
    });
}).on('error', err => {
    console.error("Request failed:", err.message);
});
