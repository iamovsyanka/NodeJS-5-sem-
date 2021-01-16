const http = require('http');
const url = require('url');
const fs = require('fs');
const sockets = new Set();

let data = require('./DB.js');
let db = new data.DB();

process.stdin.unref();

let timerSd = null;
let timerSc = null;
let timerSs = null;
let countRequest = 0;
let countCommit = 0;

db.on('GET', (request, response) => {
	console.log("GET");
	countRequest++;
    response.end(JSON.stringify(db.select()));
});

db.on('POST', (request, response) => {
	console.log('POST');
    countRequest++;
    request.on('data', data => {
        let row = JSON.parse(data);
        row.id = db.getIndex();
        db.insert(row);
        response.end(JSON.stringify(row));
    });
});

db.on('PUT', (request, response) => {
	console.log('PUT');
    countRequest++;
    request.on('data', data => {
        let row = JSON.parse(data);
        db.update(row);
        response.end(JSON.stringify(row));
    });
});

db.on('DELETE', (request, response) => {
	console.log('DELETE');
    countRequest++;
    if (typeof url.parse(request.url, true).query.id != 'undefined') {
        let id = parseInt(url.parse(request.url, true).query.id);
        if (Number.isInteger(id)) {
            let deletedRow = db.delete(id);

            response.writeHead(200, {'Content-Type' : 'application/json'});
            response.end(JSON.stringify(deletedRow));
        }
    }
});

db.on('HEAD', () => {
    console.log('COMMIT');
    countCommit++;
    db.commit();
});

let server = http.createServer(function (request, response) {
	if(url.parse(request.url).pathname === '/api/db') {
		db.emit(request.method, request, response);
	}
	else if(url.parse(request.url).pathname === '/') {
        let page = fs.readFileSync('./04-03.html');
        response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        response.end(page);
	}
    else if (request.url === '/api/ss') {
        response.writeHead(200, {'Content-Type':'application/json'});
        response.end(JSON.stringify(printStatic()));
    }

    server.close();
}).listen(5000);

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () => {
  let command = null;
  while ((command = process.stdin.read()) != null) {
    if (command.trim().startsWith('sd')) {
        if(server.listening) {

        let sec = Number(command.trim().replace(/[^\d]/g, ''));
        if(sec) {
            clearTimeout(timerSd);
            timerSd = setTimeout(() =>  server.close(), sec * 1000);
            timerSD = setTimeout(() => {
                close();
                sdTimer = null;
                },1000 * sec);
            console.log(`Server exit after ${sec} sec`);
        }
        if(!sec && command.trim().length > 2) {
            console.error("ERROR! Parameter isn\'t int");
        }
        if(command.trim().length === 2) {
            clearTimeout(timerSd);
            console.log('Undo exit server');
        }
    }
    else {
        console.error("Server is not listening");
    }
 }

    if (command.trim().startsWith('sc')) {
        //!!!!
        let sec = Number(command.trim().replace(/[^\d]/g, ''));
        if(sec) {
            clearTimeout(timerSc);
            timerSc = setInterval( () => { db.emit('HEAD') }, sec * 1000);
            timerSc.unref();
        }
        if(!sec && command.trim().length > 2) {
            console.error("ERROR! Parameter isn\'t int");
        }
        if(command.trim().length === 2) {
            clearTimeout(timerSc);
            console.log('Undo commit');
        }
    }

    if (command.trim().startsWith('ss')) {
          let sec = Number(command.trim().replace(/[^\d]/g, ''));
          if(sec) {
              clearTimeout(timerSs);
              timerSs = setInterval( () => { process.stdout.write(printStatic()); }, sec * 1000);
              timerSs.unref();
          }
          if(!sec && command.trim().length > 2) {
              console.error("ERROR! Parameter isn\'t int");
          }
          if(command.trim().length === 2) {
              clearTimeout(timerSs);
              console.log('Undo commit');
          }
    }
  }
});

function printStatic() {
    let start = Date.now();
    return 'start: '+ start + ', finish: ' + Date.now() + ', request: ' + countRequest + ', commit: ' + countCommit + '\n';
}

let close = (callback) => {
    for (const socket of sockets) {
        socket.destroy();
        sockets.delete(socket);
    }
    console.log('All connections closed');
    server.close(callback);
    console.log('Server terminated');
};
