const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function (request, response) {
	if(url.parse(request.url).pathname === '/xmlhttprequest') {
        let html = fs.readFileSync('xmlhttprequest.html');
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end(html);
    }
    if(url.parse(request.url).pathname === '/api/name') {
        let html = fs.readFileSync('text.txt');
        response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        response.end(html);
	}
}).listen(5000);

console.log('Server running at http://localhost:5000/xmlhttprequest');
