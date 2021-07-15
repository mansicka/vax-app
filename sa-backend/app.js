const http = require('http');

const server = http.createServer(function(req, res){
    console.log(req);
    console.log('start')
});

server.listen(6660);

