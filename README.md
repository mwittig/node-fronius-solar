# node-fronius-solar

[![Build Status](https://travis-ci.org/mwittig/node-fronius-solar.svg?branch=master)](https://travis-ci.org/mwittig/node-fronius-solar)

Access PV live logs using the Fronius Solar API V0 and V1.

## Usage Example

    var fronius = require('node-fronius-solar'),
        util = require('util'),
        options = {
            host: 'localhost',
            port: 8001,
            deviceId: 1
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

## Release History

See [Release History](https://github.com/mwittig/node-fronius-solar/blob/master/HISTORY.md).

## License

Copyright (c) 2016, Marcus Wittig and contributors. All rights reserved.

[MIT License](https://github.com/mwittig/node-fronius-solar/blob/master/LICENSE).