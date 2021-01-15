let http = require('http');
let fs = require('fs');

http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    let png = '';
    request.on('data', (chunk) => {
    png += chunk.toString();
    request.on('end', () => {
        console.log('request.on(end) = ', png.length)
    });
});
}).listen(8080);

let bound = '-------------573cf973d5228';
let body = `--${bound}\r\n`;
    body += 'Content-Disposition: form-data; name="file"; filename="pigeon.png"\r\n';
    body += 'Content-Type: application/octet-stream\r\n\r\n';

let options = {
    host: 'localhost',
    path: '/',
    port: 8080,
    method: 'POST',
    headers: {
        'content-type':'multipart/form-data; boundary='+bound
    }
};

let req = http.request(options, (res) => {

    let responseData = '';
    res.on('data', (chunk) => {
        responseData += chunk;
    });
    res.on('end', () => {
        console.log('length of body = ', Buffer.byteLength(responseData));
    })
});
req.write(body);

let stream = new fs.ReadStream('pigeon.png');
stream.on('data', (chunk) => {
    req.write(chunk);
    console.log(Buffer.byteLength(chunk));
});
stream.on('end', () => {
    req.end(`\r\n--${bound}--\r\n`);
});
