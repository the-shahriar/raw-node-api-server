// dependencies
const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes');
const environment = require('./helpers/environment')

// app object - model scaffolding
const app = {};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, ()=> {
        console.log('Listening to', environment.port);
    });
}

app.handleReqRes = handleReqRes;



// start seever
app.createServer();