var IbusInterface = require('./IbusInterface.js');
var IbusDevices = require('./IbusDevices.js');

// config
var device = process.argv[2];

// data
var ibusInterface = new IbusInterface(device);

// events
process.on('SIGINT', onSignalInt);
ibusInterface.on('data', onIbusData);

// implementation
function onSignalInt() {
    ibusInterface.shutdown(function() {
        process.exit();
    });
}

function onIbusData(data) {
    if (process.env.LOG_ONLY) {
        if (data.src === process.env.LOG_ONLY || data.dst === process.env.LOG_ONLY) {
            logIbusPacket(data);
        }
    } else {
        logIbusPacket(data);
    }
}

function logIbusPacket(data) {
    console.log('[IbusReader]', 'Id: 	        ', data.id);
    console.log('[IbusReader]', 'From: 	        ', IbusDevices.getDeviceName(data.src));
    console.log('[IbusReader]', 'To: 	        ', IbusDevices.getDeviceName(data.dst));
    console.log('[IbusReader]', 'Message:       ', data.msg);
    console.log('[IbusReader]', 'Message (text):', data.msg.toString(), '\n');
}

function init() {
    ibusInterface.startup();
}

// main start
init();

/*
for (var i = 0; i < 2; i++) {
    ibusInterface.sendMessage({
        src: 0x08,
        dst: 0x18,
        msg: new Buffer([0x0AA, 0xBB, i, 0xCC, 0xDD, 0xEE])
    });
}
*/