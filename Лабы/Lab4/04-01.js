const http = require('http');
const url = require('url');

let data = require('./DB.js');
let db = new data.DB();

db.on('GET', async (request, response) => {
	console.log("GET");

    await response.end(JSON.stringify(await db.select()));
});

db.on('POST', async (request, response) => {
    console.log('POST');
    let row = {
        name: url.parse(request.url, true).query.name,
        dbay: url.parse(request.url, true).query.bday,
        id: db.getIndex()
    };

    await response.end(JSON.stringify(await db.insert(row)));
});

db.on('PUT', async (request, response) => {
	console.log('PUT');
    let row = {
        id: parseInt(url.parse(request.url, true).query.id),
        name: url.parse(request.url, true).query.name,
        dbay: url.parse(request.url, true).query.bday
    };

    await response.end(JSON.stringify(await db.update(row)));
});

db.on('DELETE', async (request, response) => {
	console.log('DELETE');
	let id = +url.parse(request.url, true).query.id;

    await response.end(await db.delete(id));
});

http.createServer(function (request, response) {
	if(url.parse(request.url).pathname === '/api/db') {
	    //для генерации событий
        db.emit(request.method, request, response);
    }
}).listen(5000);
