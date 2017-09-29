# Release History

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
    
* 20160318, V0.0.5
    * Added GetComponentsData() for using an undocumented API service provided by the data logger 
      of the Symo inverters. Issue #1
    * Moved server.js to 'test' directory as a starting pointed for automating testing
    * Updated dependencies
    
* 20160330, V0.0.6
    * Added HTTP-Digest Authentication as required for GetComponentsData if authentication has been enabled 
      for Fronius Data Manager
    * Added GetPowerFlowRealtimeDataData() Solar API V1 service call
    * Moved release history to separate file
    * Added license info to README

* 20160601, V0.0.7
    * Added basic support for V0 GetInverterRealtimeData

* 20160601, V0.0.8
    * Bug fix for V0 GetInverterRealtimeData
    
* 20160921, V0.0.9
    * Updated dependencies
    
* 20170929, V0.0.10
    * Updated dependencies
    * Added Greenkeeper badge