const http = require('http');
const url = require('url');
const fs = require('fs');

let data = require('./DB.js');
let db = new data.DB();

db.on('GET', (request, response) => {
	console.log('GET');

    response.end(JSON.stringify(db.select()));
});

db.on('POST', (request, response) => {
	console.log('POST');

    request.on('data', data => {
        let row = JSON.parse(data);
        row.id = db.getIndex();
        db.insert(row);
        response.end(JSON.stringify(row));
    });
});

db.on('PUT', (request, response) => {
	console.log('PUT');

    request.on('data', data => {
        let row = JSON.parse(data);
        db.update(row);
        response.end(JSON.stringify(row));
    });
});

db.on('DELETE', (request, response)=>{
	console.log('DELETE');
    if (url.parse(request.url, true).query.id !== null) {
        let id = +url.parse(request.url, true).query.id;
        if (Number.isInteger(id)) {
            let deletedRow = db.delete(id);
            response.writeHead(200, {'Content-Type' : 'application/json'});
            response.end(JSON.stringify(deletedRow));
        }
    }
});

http.createServer(function (request, response) {
	if(url.parse(request.url).pathname === '/api/db') {
		db.emit(request.method, request, response);
	}
	if(url.parse(request.url).pathname === '/') {
        let page = fs.readFileSync('./04-03.html');
        response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        response.end(page);
    }
}).listen(5000);
