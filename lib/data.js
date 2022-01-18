// dependencies
const fs = require('fs');
const path = require('path');

const lib = {};

// base directory of data folder
lib.basedir = path.join(__dirname, '/../.data');

// write data to file
lib.create = (dir, file, data, callback) => {
    // open file for writting
    fs.open(lib.basedir+dir+'/'+file+'.json', 'wx', (err1, fileDescriptor)=> {
        if(!err1 && fileDescriptor){
            // convert data to string
            const stringData = JSON.stringify(data);
            
            // write data to file and close it
            fs.writeFile(fileDescriptor, stringData, (err2)=> {
                if(!err2){
                    fs.close(fileDescriptor, (err3)=> {
                        if(!err3){
                            callback(false);
                        }
                        else{
                            callback('Error closing the file')
                        }
                    })
                }
                else{
                    callback('Error writting to new file')
                }
            })
        }
        else{
            callback('Could not create new file, it may already exist')
        }
    })
}