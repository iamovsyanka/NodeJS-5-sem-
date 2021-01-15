const http = require('http');
const fs = require('fs');
const url = require('url');

let fact = (n) => { return (n === 0 ? 1 : fact(n-1) * n);};

http.createServer(function (request, response) {
    let x = url.parse(request.url);
    if (url.parse(request.url).pathname === '/fact') {
        if (url.parse(request.url, true).query.k !== null) {
            let k = +url.parse(request.url, true).query.k;
            if (Number.isInteger(k)) {
                response.writeHead(200, {'Content-Type' : 'application/json'});
                response.end(JSON.stringify({ k: k , fact: fact(k) }));
            }
        }
    }
    else if (url.parse(request.url).pathname === '/') {
        let page = fs.readFileSync('./03-03.html');
        response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        response.end(page)
    }
}).listen(5000);

console.log('Server running at http://localhost:5000/fact');
