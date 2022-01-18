// dependencies
const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes');
const environment = require('./helpers/environment');
const data = require('./lib/data');

// app object - model scaffolding
const app = {};

// testing file system
data.create('test', 'newFile', {'name': 'Bangladesh', 'language': 'Bangla'}, (error)=> {
    console.log('error was', error);
})

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