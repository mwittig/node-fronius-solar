var fronius = require('./index'),
    util = require('util'),
    options = {
        username: "admin",
        password: "admin",
        host: 'localhost',
        port: 8001,
        deviceId: 1,
        version: 0
    },
    x = Date.now();

// This is the Solar API V0 call which should work with Fronius Datalogger Web v2.0.4.1 (and higher) and
// Fronius Data Manager v3.0.3-1 (and higher)
fronius.GetInverterRealtimeData(options).then(function (json) {
    console.log(util.inspect(json, { depth: 4, colors : true }));
    console.log(Date.now() - x, "milliseconds elapsed")
}).catch(function(e) {console.log(e)});

// This is the Solar API V1
options.version = 1;
fronius.GetInverterRealtimeData(options).then(function (json) {
    console.log(util.inspect(json, { depth: 4, colors : true }));
    console.log(Date.now() - x, "milliseconds elapsed")
}).catch(function(e) {console.log(e)});

// GetComponentsData is provided to use an undocumented API service of the Fronius Data Manager
// provided with the Symo inverters. See https://forum.fhem.de/index.php/topic,24614.msg214011.html#msg214011
// In contrast to the regular Solar API Calls which do not require authentication, you may need to provide
// username and password properties to the options dictionary (if authentication has been enabled
// for Fronius Data Manager.
fronius.GetComponentsData(options).then(function (json) {
    console.log(util.inspect(json, { depth: 4, colors : true }));
    console.log(Date.now() - x, "milliseconds elapsed")
}).catch(function(e) {console.log(e)});

// This is a Solar API V1 call which should work with Fronius Data Manager v3.4.2-1 (and higher)
fronius.GetPowerFlowRealtimeDataData(options).then(function (json) {
    console.log(util.inspect(json, { depth: 4, colors : true }));
    console.log(Date.now() - x, "milliseconds elapsed")
}).catch(function(e) {console.log(e)});