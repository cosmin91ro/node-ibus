var IbusInterface = require('./IbusInterface.js');
var IbusDevices = require('./IbusDevices.js');

var device = process.argv[2];

// data
var ibusInterface = new IbusInterface(device);

function init() {
    ibusInterface.startup();
}

process.on('SIGINT', onSignalInt);

// implementation
function onSignalInt() {
    ibusInterface.shutdown(function() {
        process.exit();
    });
}
// main start
init();

packet = Buffer.from(process.argv[3], 'hex');
ibusInterface.sendMessage({
    src: packet[0],
    dst: packet[2],
    msg: packet.slice(3)
});
setTimeout(() => {
    process.exit(0);
}, 2000)