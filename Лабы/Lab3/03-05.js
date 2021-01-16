const http = require('http');
const fs = require('fs');
const url = require('url');

let fact = n => { return (n === 0 ? 1 : fact(n - 1) * n);};

class Fact {
    constructor (n, cb) {
        this.ffact = fact;
        this.num = n;
        this.cb = cb;
    }

    calc() {
        setImmediate(() => {
            this.cb(null, this.ffact(this.num));
        });
    }
}

http.createServer(function (request, response) {
    if (url.parse(request.url).pathname === '/fact') {
        if (typeof url.parse(request.url, true).query.k != 'undefined') {
            let k = parseInt(url.parse(request.url, true).query.k);
            if (Number.isInteger(k)) {
                response.writeHead(200, {'Content-Type' : 'application/json'});
                let fact = new Fact(k, (error, result) => {
                    response.end( JSON.stringify({ k: k , fact: result }) );
                });
                fact.calc();
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
