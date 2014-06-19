/*jslint nomen: true */
/*jslint node: true */
/*global */

var handler,
    app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    path = require('path'),
    port = 1337,
    utilTimer,
    widgetIdRegistry = {
        gaugeType: ['gauge1', 'gauge2'],
        sliderType: ['slider1'],
        numericType: ['numeric1']
    };

app.listen(port);

//file server implementation
function handler(req, res) {
    "use strict";
    var filePath = req.url,
        extentionName  = path.extname(filePath),
        contentType = 'text/html';
    
    if (filePath === '/') {
        filePath = '/index.html';
    } else {
        filePath = req.url;
    }
        
    switch (extentionName) {
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.css':
        contentType = 'text/css';
        break;
    case '.png':
        contentType = 'image/png';
        break;
    }
    
    fs.readFile(__dirname + filePath, function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200, {'Content-Type': contentType});
        res.end(data);
    });
}

//websocket implementation
io.sockets.on('connection', function (socket) {
    "use strict";
    console.log(widgetIdRegistry);
    socket.emit('init', widgetIdRegistry); //change
    
    var rate = 1000,
        i,
        data = [],
        randEmit = function () {
            //dummy data.  The contents of the data doesn't matter but the format of the object does. 
            data = [
                {id: widgetIdRegistry.gaugeType[0], value: Math.random() * 100},
                {id: widgetIdRegistry.gaugeType[1], value: Math.random() * 100},
                //{id: widgetIdRegistry.sliderType[0], value: Math.random() * 100},
                {id: widgetIdRegistry.numericType[0], value: Math.random() * 100}
            ];
            
            //var rand = Math.random() * 100;
            socket.emit('runtime-data-direction-a', data);
        };
    
    
    utilTimer.startTimer(randEmit, rate);
    
    socket.on('runtime-data-direction-b', function (o) {
        utilTimer.stopTimer();
        rate = o.rate;
        utilTimer.startTimer(randEmit, rate);
    });
});

//helper objects
var utilTimer = (function () {
    "use strict";
    var stopped = false,
        internalTimerObject,
        startTimer = function (callback, interval) {
            stopped = false;
            internalTimerObject = setInterval(callback, interval);
        },
        stopTimer = function () {
            clearInterval(internalTimerObject);
        };
    return {
        startTimer: startTimer,
        stopTimer: stopTimer
    };
}());

