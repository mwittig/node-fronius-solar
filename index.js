var util = require('util'),
    http = require('http'),
    https = require('https'),
    _ = require('lodash'),
    Promise = require('bluebird'),
    lastRequest = Promise.resolve(),
    debug = process.env.hasOwnProperty('FRONIUS_DEBUG') ? consoleDebug : function () {
    },
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

function getRequest(options) {
    var id = options.deviceId || DEFAULT_DEVICE_ID,
        requestOptions = _.assign({
            deviceId: DEFAULT_DEVICE_ID,
            timeout: 20000,
            rejectUnauthorized: false,
            protocol: 'http:',
            path: '/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=' + id + '&DataCollection=CommonInverterData',
            headers: {},
            method: 'GET'
        }, options),
        timeoutOccurred = false;

    requestOptions.headers['Host'] = requestOptions.host;
    if (!_.isUndefined(requestOptions.username) && !_.isUndefined(requestOptions.password)) {
        requestOptions.headers['Authorization'] =
            "Basic " + new Buffer(requestOptions.username + ":" + requestOptions.password).toString("base64");
    }

    debug('REQUEST OPTIONS: ' + JSON.stringify(requestOptions));

    return new Promise(function (resolve, reject) {
        var data = "",
            proto = (requestOptions.protocol == 'https:') ? https : http,
            getReq = proto.request(requestOptions, function (response) {
                debug('STATUS: ' + response.statusCode);
                debug('HEADERS: ' + JSON.stringify(response.headers));

                var error;
                if (response.statusCode >= 300) {
                    if (response.statusCode === 401) {
                        error = new Error("Unauthorized: check username/password");
                    }
                    else {
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
                        }
                        else {
                            var error = new Error("Invalid response body format: Head and Body expected");
                            debug('ERROR:' + 'Host ' + requestOptions.host + ' ' + error);
                            return reject(error);
                        }
                    }
                    catch (e) {
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
    return checkRequiredProperties(options, ['host', 'deviceId']).then(function () {
        return lastRequest = settlePromise(lastRequest).then(function () {
            return getRequest(options).then(function (json) {
                return Promise.resolve(json);
            })
        })
    })
};
