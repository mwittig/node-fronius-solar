var util = require('util'),
    http = require('http'),
    https = require('https'),
    _ = require('lodash'),
    Promise = require('bluebird'),
    lastRequest = Promise.resolve(),
    debug = process.env.hasOwnProperty('FRONIUS_DEBUG') ? consoleDebug : function () {},
    DEFAULT_DEVICE_ID = 1;

//
// Private Helper Functions
//

function consoleDebug() {
    console.log.apply(this, arguments)
}

function settlePromise(aPromise) {
    return aPromise.reflect();
}

function getRequest(options, path) {
    var id = options.deviceId || DEFAULT_DEVICE_ID;
    var urlPath = path;
    if (!urlPath) {
        if (options.version === 0) {
            urlPath = '/solar_api/GetInverterRealtimeData.cgi?Scope=Device&DeviceIndex=';
        } else {
            urlPath = '/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=';
        }
        urlPath += id + '&DataCollection=CommonInverterData'
    }
    var requestOptions = _.assign({
        deviceId: DEFAULT_DEVICE_ID,
        timeout: 20000,
        rejectUnauthorized: false,
        protocol: 'http:',
        path: urlPath,
        headers: {},
        method: 'GET'
    }, options);
    var timeoutOccurred = false;

    requestOptions.headers['Host'] = requestOptions.host;
    //if (!_.isUndefined(requestOptions.username) && !_.isUndefined(requestOptions.password)) {
    //    requestOptions.headers['Authorization'] =
    //        "Basic " + new Buffer(requestOptions.username + ":" + requestOptions.password).toString("base64");
    //}

    debug('REQUEST OPTIONS: ' + JSON.stringify(requestOptions));

    return new Promise(function (resolve, reject) {
        var data = "";
        var proto = (requestOptions.protocol == 'https:') ? https : http;
        if (requestOptions.username != null) {
            proto = require('http-digest-client')(
                requestOptions.username,
                requestOptions.password,
                (requestOptions.protocol == 'https:')
            );
        }
        var getReq = proto.request(requestOptions, function (response) {
            debug('STATUS: ' + response.statusCode);
            debug('HEADERS: ' + JSON.stringify(response.headers));

            var error;
            if (response.statusCode >= 300) {
                if (response.statusCode === 401) {
                    error = new Error("Unauthorized: check username/password");
                } else {
                    error = new Error("Request failed. HTTP Status Code: " + response.statusCode);
                }
                debug('ERROR:' + 'Host ' + requestOptions.host + ' ' + error);
                return reject(error);
            }

            response.setEncoding('utf8');
            response.on('data', function (result) {
                debug("DATA CHUNK", result);
                data += result;
            });
            response.on('end', function () {
                debug("END");
                try {
                    var json = JSON.parse(data);
                    if (_.has(json, 'Head') && _.has(json, 'Body')) {
                        return resolve(json);
                    } else {
                        var error = new Error("Invalid response body format: Head and Body expected");
                        debug('ERROR:' + 'Host ' + requestOptions.host + ' ' + error);
                        return reject(error);
                    }
                } catch (e) {
                    var error = new Error("Invalid response body: " + e.toString());
                    debug('ERROR:' + 'Host ' + requestOptions.host + ' ' + error);
                    return reject(error);
                }
            });
        }).on('error', function (error) {
            if (timeoutOccurred) {
                error = new Error("Request timeout occurred - request aborted");
            }
            debug('ERROR:' + 'Host ' + requestOptions.host + ' ' + error);
            getReq.abort();
            return reject(error);
        }).on('timeout', function () {
            timeoutOccurred = true;
            getReq.abort();
        });
        getReq.setTimeout(requestOptions.timeout);
        getReq.end();
    });
}

function checkRequiredProperties(options, requiredPropsArray) {
    for (var i = 0; i < requiredPropsArray.length; ++i) {
        if (_.isUndefined(options[requiredPropsArray[i]])) {
            return Promise.reject("Request options lacks required property=" + requiredPropsArray[i]);
        }
    }
    return Promise.resolve()
}

//
// Public Functions
//


module.exports.GetInverterRealtimeData = function (options) {
    var opts = _.clone(options);
    return checkRequiredProperties(opts, ['host', 'deviceId']).then(function () {
        return lastRequest = settlePromise(lastRequest).then(function () {
            return getRequest(opts).then(function (json) {
                return Promise.resolve(json);
            })
        })
    })
};

// GetComponentsData is provided to use an undocumented API service provided by the data logger
// of the Symo inverters. See https://forum.fhem.de/index.php/topic,24614.msg214011.html#msg214011
module.exports.GetComponentsData = function (options) {
    var opts = _.clone(options);
    return checkRequiredProperties(opts, ['host']).then(function () {
        return lastRequest = settlePromise(lastRequest).then(function () {
            return getRequest(opts, '/components/5/0/?print=names').then(function (json) {
                return Promise.resolve(json);
            })
        })
    })
};

module.exports.GetPowerFlowRealtimeData = function (options) {
    var opts = _.clone(options);
    return checkRequiredProperties(opts, ['host']).then(function () {
        return lastRequest = settlePromise(lastRequest).then(function () {
            return getRequest(opts, '/solar_api/v1/GetPowerFlowRealtimeData.fcgi').then(function (json) {
                return Promise.resolve(json);
            })
        })
    })
};

module.exports.GetMeterRealtimeData = function (options) {
    var opts = _.clone(options);
    opts.scope = "Device";
    return checkRequiredProperties(opts, ['host', 'deviceId']).then(function () {
        return lastRequest = settlePromise(lastRequest).then(function () {
            return getRequest(opts, '/solar_api/v1/GetMeterRealtimeData.cgi').then(function (json) {
                return Promise.resolve(json);
            })
        })
    })
};

module.exports.GetStorageRealtimeData = function (options) {
    var opts = _.clone(options);
    opts.scope = "Device";
    return checkRequiredProperties(opts, ['host', 'deviceId']).then(function () {
        return lastRequest = settlePromise(lastRequest).then(function () {
            return getRequest(opts, '/solar_api/v1/GetStorageRealtimeData.cgi').then(function (json) {
                return Promise.resolve(json);
            })
        })
    })
};
