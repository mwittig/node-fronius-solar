var fronius = require('./index'),
    util = require('util'),
    options = {
        username: "admin",
        password: "admin",
        host: 'localhost',
        port: 8001,
        deviceId: '1'
    },
    x = Date.now();

fronius.GetInverterRealtimeData(options).then(function (json) {
    console.log(util.inspect(json, { depth: 4, colors : true }));
    console.log(Date.now() - x, "milliseconds elapsed")
}).catch(function(e) {console.log(e)});

// GetComponentsData is provided to use an undocumented API service provided by the data logger
// of the Symo inverters. See https://forum.fhem.de/index.php/topic,24614.msg214011.html#msg214011
fronius.GetComponentsData(options).then(function (json) {
    console.log(util.inspect(json, { depth: 4, colors : true }));
    console.log(Date.now() - x, "milliseconds elapsed")
}).catch(function(e) {console.log(e)});