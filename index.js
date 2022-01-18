// dependencies
const http = require('http');

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
    })
}

// handle Request Response
app.handleReqRes = (req, res)=> {
    res.end('Hello world');
};

// start seever
app.createServer();