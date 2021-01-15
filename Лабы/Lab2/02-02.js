const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function (request, response) {
  if(url.parse(request.url).pathname === '/png') {
    const pngf = './2.png';
    let png = null;
    //Вызывают этот метод, передавая ему путь к файлу, и, после того,
    // как Node.js получит необходимые сведения о файле, он вызовет коллбэк
    fs.statSync(pngf, (err, stat) => {
      if(err) {
        console.error('error', err);
      }
      else {
        //Для чтения файла в синхронном варианте
        png = fs.readFileSync(pngf);
        response.writeHead(200, {'Content-Type': 'image/png', 'Content-Length': stat.size});
        response.end(png, 'binary');
      }
    });
  }
}).listen(5000);

console.log('Server running at http://localhost:5000/png');
