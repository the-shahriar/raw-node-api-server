// dependencies
const url = require('url');
const {StringDecoder} = require('string_decoder');
const routes = require('../routes');
const {notFoundHandler} = require('../handlers/routeHandlers/notFoundHandler');


// module scaffolding
const handler = {};

handler.handleReqRes = (req, res)=> {
    // get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.path;
    const trimedPath = path.replace(/^\/+|\/+$/g, '');
    
    const method = req.method.toLowerCase();
    const queryString = parsedUrl.query;
    const headers = req.headers;
    
    const requestProperties = {
        parsedUrl,
        path,
        trimedPath,
        method,
        queryString,
        headers
    }

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const choosenHandler = routes[trimedPath] ? routes[trimedPath] : notFoundHandler;

    // get data from body
    req.on('data', (buffer)=> {
        realData += decoder.write(buffer); 
    })

    req.on('end', ()=> {
        realData += decoder.end();

        choosenHandler(requestProperties, (statusCode, payload)=> {
            statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
            payload = typeof(payload) === 'object' ? payload : {};
    
            const payloadString = JSON.stringify(payload);
    
            // final response;
            res.writeHead(statusCode);
            res.end(payloadString);
        });
        // response
        res.end('Hello programmers');
    })


};

module.exports = handler;