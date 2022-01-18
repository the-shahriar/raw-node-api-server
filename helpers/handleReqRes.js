// dependencies
const url = require('url');
const {StringDecoder} = require('string_decoder');

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
    
    const decoder = new StringDecoder('utf-8');
    let realData = '';

    // get data from body
    req.on('data', (buffer)=> {
        realData += decoder.write(buffer);
    })

    req.on('end', ()=> {
        realData += decoder.end();
        console.log(realData);
        // response
        res.end('Hello prog');
    })


};

module.exports = handler;