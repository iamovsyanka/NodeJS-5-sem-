const http = require('http');

let head = request => {
	let rc = '';
	for (let key in request.headers) {
		rc += `${key}: ${request.headers[key]}`;
	}

	return rc;
};

http.createServer(function(request, response) {
	let body = '';
	request.on('data', chunk => {
		body += chunk;
		console.log('data', body);
	});
	response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
	request.on('end', () => response.end(
			'<!DOCTYPE html> <html lang=\"en\"><head><title>Lab1</title></head>' +
			'<body style="background: whitesmoke">' +
			'<h1>REQUEST</h1>' +
			'<p style="color: #0aaaf1">' + 'method: ' + request.method + '</p>' +
			'<p style="color:  limegreen">' + 'uri: ' + request.url + '</p>' +
			'<p style="color: orange">' + 'version: ' + request.httpVersion + '</p>' +
			'<p style="color: indianred">' + 'HEADERS: ' + head(request) + '</p>' +
			'<p style="color: rebeccapurple">' + 'body: ' + body + '</p>' +
			'</body>' +
			'</html>'
		)
	)
}).listen(3000);

console.log('Server running at http://localhost:3000/');
