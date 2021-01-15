const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function(request, response) {
	//Метод принимает строку URL, анализирует ее и возвращает объект URL
	if(url.parse(request.url).pathname === '/html') {
		let html = fs.readFileSync('./index.html');
		response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		response.end(html);
	}
}).listen(5000);

console.log('Server running at http://localhost:5000/html');
