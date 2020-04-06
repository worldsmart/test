const ftp_parser = require('./ftp_parser');

module.exports = (action)=>{
    if(action == 'Parse from FTP'){
        ftp_parser();
    }
};