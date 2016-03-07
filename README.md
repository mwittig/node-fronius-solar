# node-fronius-solar

[![Build Status](https://travis-ci.org/mwittig/node-fronius-solar.svg?branch=master)](https://travis-ci.org/mwittig/node-fronius-solar)

Access PV live logs using the Fronius Solar API. Work in progress.

## Usage Example

    var fronius = require('node-fronius-solar'),
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
    
    // GetComponentsData is provided to use an undocumented API service provided by the data logger
    // of the Symo inverters. See https://forum.fhem.de/index.php/topic,24614.msg214011.html#msg214011 
    fronius.GetComponentsData(options).then(function (json) {
        console.log(util.inspect(json, { depth: 4, colors : true }));
        console.log(Date.now() - x, "milliseconds elapsed")
    }).catch(function(e) {console.log(e)});

## History

* 20150512, V0.0.1
    * Initial Version

* 20150514, V0.0.2
    * Improved error handling
    * Added support for HTTPS, added rejectUnauthorized: false to allow self-signed server certs. Should be set to true
      if server has a certificate signed from a trusted CA

* 20150518, V0.0.3
    * Improved error handling
    
* 20160305, V0.0.4
    * Updated dependencies
    * Replaced deprecated usage of Promise.settle() function
    * Added travis build descriptor