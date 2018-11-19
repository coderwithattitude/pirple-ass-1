// Dependencies
const http = require('http');
const url = require('url'); 
const StringDecoder = require('string_decoder').StringDecoder;

// Configure the server to respond to requests
let server = http.createServer(function(req,res){
    
    // Parse the url
    let parsedUrl = url.parse(req.url,true);

    // Get the path
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    let queryStringObject = parsedUrl.query;

    // Get the Http method
    let method = req.method.toLowerCase();

    // Get the headers
    let headers = req.headers;

    // Get the payload,if any
    let decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', function(data) {
        buffer += decoder.write(data);
    });
    req.on('end', function() {
        buffer += decoder.end();

        // route message to hello handler, if not found use not found handler
        let chosenHandler = typeof(router[trimmedPath]) !== 'hello' ? router[trimmedPath] : handlers.notFound;

        // Construct the data object to send 
        let data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        };

        // Route the request to the hello handler
        chosenHandler(data,function(status,payload){
            // Use the status code called bacl by the hamdler or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // Use the payload or default to an empty object
            chosen = typeof(payload) ==  'object' ? payload : {};

            // Convert payload to a string
            let payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type','application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            console.log('Returning this response: ',payloadString);
        });
    });
    

});

// Start server, and have it listen on port 3000
server.listen(3000,function(){
    console.log('Server running on port 3000 now');
});

// Define a request router
let handlers = {};

// Hello handler
handlers.hello = function(data,callback){
    // Callbak a http status and a payload
    callback(406,'Hello earthlings welcome to mars'); 
};

// Not found handler
handlers.notFound = function(data,callback){

};

let router = {
    'hello' : handlers.hello
}