const http = require('http');

http.createServer(function(request, response) {
	//Отправляет заголовок ответа на запрос. Код состояния - это 3-значный HTTP -код состояния
	//Последний аргумент headers- это заголовки ответов.
	response.writeHead(200, {'Content-Type': 'text/html'});
	//Отправляем ответ
	response.end('<h1>Hello World</h1>');
}).listen(3000);

console.log('Server running at http://localhost:3000/');

/*
General Headers (Общие заголовки) — используются в запросах и ответах.
Request Headers (Заголовки запроса) — используются только в запросах.
Response Headers (Заголовки ответа) — используются только в ответах.
Entity Headers (Заголовки сущности) — сопровождают каждую сущность сообщения.
Используются в запросах и ответах.*/
