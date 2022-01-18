// dependencies
const http = require('http');
const url = require('url');
const {StringDecoder} = require('string_decoder');

// app object - model scaffolding
const app = {};

// configuration
app.config = {
    port: 3000
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, ()=> {
        console.log('Listening to', app.config.port);
    });
}

// handle Request Response
app.handleReqRes = (req, res)=> {
    // request handling
    // get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.path;
    const trimedPath = path.replace(/^\/+|\/+$/g, '');
    
    const method = req.method.toLowerCase();
    const queryString = parsedUrl.query;
    const headers = req.headers;
    
    const decoder = new StringDecoder('utf-8');
    const realData = '';

    req.on('data', (buffer)=> {
        realData += decoder.write(buffer);
    })

    req.on('end', ()=> {
        realData += decoder.end();
    })

    // response
    res.end('Hello prog');
};

// start seever
app.createServer();