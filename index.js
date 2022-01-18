// dependencies
const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes');
const environment = require('./helpers/environment');
const data = require('./lib/data');

// app object - model scaffolding
const app = {};

// testing file system
// write data
// data.create('test', 'newFile', {'name': 'Bangladesh', 'language': 'Bangla'}, (error)=> {
//     console.log('error was', error);
// });

// read data
// data.read('test', 'newFile', (error, data)=> {
//     console.log(data, error);
// });

// update data
// data.update('test', 'newFile', {'name': 'England', 'language': 'English'}, (error)=> {
//     console.log('Error was:', error);
// });

// delete file
data.delete('test', 'newFile', (error)=> {
        console.log('Error was:', error);
});

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