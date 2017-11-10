var fs = require('fs');
var index = fs.readFileSync('index.html');

var http = require('http'),
    httpServ = http.createServer(function (req, res) {
        if ((req.url == '/index.html') || (req.url == '/')){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(index);
        }
        if (req.url == '/mqtt.png'){
            var icon = fs.readFileSync('./mqtt.png');
            res.writeHead(200, {'Content-Type': 'image/png' });
            res.end(icon, 'binary');
        }
        res.end("No Found.");
        
    }),
    mosca = require('mosca'),
    mqttServ = new mosca.Server({});

mqttServ.attachHttpServer(httpServ);

httpServ.listen(process.env.PORT || 8080);

