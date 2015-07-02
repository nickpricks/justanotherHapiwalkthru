/**
 * Created by nick on 2/7/15.
 */
var Hapi        = require('hapi'),
    Server      = new Hapi.Server(),
    theHandler  = function (type, request, reply, message) {
        if (type.toUpperCase() === "GET") {
            console.log("request.params", request.params);
            reply('Hello ' + request.params.name + " " + message);
        } else if (type.toUpperCase() === "POST") {
            console.log("request.body", request.body);
            reply('Hello ' + message);
        } else {
            console.log("request", request);
            reply('Hello ' + message);
        }
    };

Server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

Server.route(
    {
        path    : '/',
        method  : 'GET',
        handler : function (request, reply) {
            theHandler('GET', request, reply, "Server is ON...");
        }
    }
);

Server.start(function() {
    console.log('Server running at:', Server.info.uri);
    console.log('Oh My Gosh!!! What have we done ????');
});

Server.route(
    {
        path    : '/hello/{name}',
        method  : 'GET',
        handler : theHandler
    }
);

Server.route({
    method: ['PUT', 'POST'],
    path: '/',
    handler: function (request, reply) {
        theHandler('I did something!');
    }
});
