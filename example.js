var fronius = require('./index'),
    util = require('util'),
    options = {
        host: 'localhost',
        port: 8001,
        deviceId: '1'
    },
    x = Date.now();

fronius.GetInverterRealtimeData(options).then(function (json) {
    console.log(util.inspect(json, { depth: 4, colors : true }));
    console.log(Date.now() - x, "milliseconds elapsed")
}).catch(function(e) {console.log(e)});