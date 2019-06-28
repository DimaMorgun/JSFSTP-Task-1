const http = require('http');
const customModule = require('./modules/datetimemodule');
const watch = require('node-watch');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    console.log(`Current date ${customModule.getDate()}\nCurrent UTC date ${customModule.getUtcDate()}`);

    res.end('New Hello World!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

watch('./', { recursive: true }, console.log);