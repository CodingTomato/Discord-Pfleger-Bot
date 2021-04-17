let logs = [];

module.exports.log = function(message){
    let d = new Date(Date.now());
    console.log(message);
    
    logs.push({
        logID: Math.random(),
        logMessage: "[INFO] (" + d.toLocaleString() + ") " + message,
    });
}

module.exports.error = function(message){
    let d = Date(Date.now());
    console.log(message);
    
    logs.push({
        logID: Math.random(),
        logMessage: "[ERROR] (" + d.toLocaleString() + ") " + message,
    });
}

module.exports.getLogs = function(){
    return logs;
}