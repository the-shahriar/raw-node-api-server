// dependencies
const fs = require('fs');
const path = require('path');

const lib = {};

// base directory of data folder
lib.basedir = path.join(__dirname, '/../.data/');

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
};

// read data from file
lib.read = (dir, file, callback)=> {
    fs.readFile(lib.basedir+dir+'/'+file+'.json', 'utf8', (err1, data)=> {
        callback(err1, data);
    })
}

// update existing file
lib.update = (dir, file, data, callback) => {
    // file open for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert the data to string
            const stringData = JSON.stringify(data);

            // truncate the file
            fs.ftruncate(fileDescriptor, (err1) => {
                if (!err1) {
                    // write to the file and close it
                    fs.writeFile(fileDescriptor, stringData, (err2) => {
                        if (!err2) {
                            // close the file
                            fs.close(fileDescriptor, (err3) => {
                                if (!err3) {
                                    callback(false);
                                } else {
                                    callback('Error closing file!');
                                }
                            });
                        } else {
                            callback('Error writing to file!');
                        }
                    });
                } else {
                    callback('Error truncating file!');
                }
            });
        } else {
            console.log(`Error updating. File may not exist`);
        }
    });
};

// delete existing file
lib.delete = (dir,file, callback)=> {
    // unlink file
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (error)=> {
        if(!error){
            callback(false);
        }
        else{
            callback('Error deleting file');
        }
    })
}


module.exports = lib;