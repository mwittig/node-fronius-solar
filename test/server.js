"use strict";

var http = require("http"),
    url = require("url"),
    path = require("path"),
    auth = require('http-auth'),
    crypto = require('crypto'),
    port = process.argv[2] || 8001,
    resourcePaths = {
        REALTIME_DATA_V0: '/solar_api/GetInverterRealtimeData.cgi',
        REALTIME_DATA: '/solar_api/v1/GetInverterRealtimeData.cgi',
        COMPONENTS: '/components/5/0/?print=names',
        POWER_FLOW_REALTIME_DATA: '/solar_api/v1/GetPowerFlowRealtimeData.fcgi',
        METER_REALTIME_DATA: '/solar_api/v1/GetMeterRealtimeData.cgi',
        STORAGE_REALTIME_DATA: '/solar_api/v1/GetStorageRealtimeData.cgi'
    },
    realm = "PV Data Logger",
    useDigestAuth = true;
//solar_api/GetInverterRealtimeData.cgi?Scope=Device&DeviceIndex=1&DataCollection=CommonInverterData
function normalize(path) {
    // do some minimal normalization of the URL path, i.e. remove double slashes
    return path.replace(/\/{2,}/, '/')
}

var requestListener = function (request, response) {

    var requestUrl = url.parse(request.url);
    console.log("Request URL path", requestUrl.path);

    if (normalize(requestUrl.pathname) === resourcePaths.REALTIME_DATA_V0) {
        console.log("200 OK");
        response.writeHead(200, {
            "Content-Type": "application/json; charset=ISO-8859-1"
        });
        response.end(JSON.stringify({
            "Head": {
                "RequestArguments": {
                    "DataCollection": "CommonInverterData",
                    "DeviceClass": "Inverter",
                    "DeviceIndex": "1",
                    "Scope": "Device"
                },
                "Status": {
                    "Code": 0,
                    "Reason": "",
                    "UserMessage": ""
                },
                "Timestamp": "2016-06-01T15:31:47+02:00"
            },
            "Body": {
                "Data": {
                    "DAY_ENERGY": {
                        "Value": 10000,
                        "Unit": "Wh"
                    },
                    "FAC": {
                        "Value": 49.97,
                        "Unit": "Hz"
                    },
                    "IAC": {
                        "Value": 8.42,
                        "Unit": "A"
                    },
                    "IDC": {
                        "Value": 8.48,
                        "Unit": "A"
                    },
                    "PAC": {
                        "Value": 2021,
                        "Unit": "W"
                    },
                    "TOTAL_ENERGY": {
                        "Value": 70334000,
                        "Unit": "Wh"
                    },
                    "UAC": {
                        "Value": 240,
                        "Unit": "V"
                    },
                    "UDC": {
                        "Value": 253,
                        "Unit": "V"
                    },
                    "YEAR_ENERGY": {
                        "Value": 3746000,
                        "Unit": "Wh"
                    },
                    "DeviceStatus": {
                        "StatusCode": 7,
                        "MgmtTimerRemainingTime": -1,
                        "ErrorCode": 0,
                        "LEDColor": 2,
                        "LEDState": 0,
                        "StateToReset": false
                    }
                }
            }
        }));
        return;
    } else if (normalize(requestUrl.pathname) === resourcePaths.REALTIME_DATA) {
        console.log("200 OK");
        response.writeHead(200, {
            "Content-Type": "application/json; charset=ISO-8859-1"
        });
        response.end(JSON.stringify({
            "Head": {
                "RequestArguments": {
                    "DataCollection": "CommonInverterData",
                    "DeviceClass": "Inverter",
                    "DeviceId": "1",
                    "Scope": "Device"
                },
                "Status": {
                    "Code": 0,
                    "Reason": "",
                    "UserMessage": ""
                },
                "Timestamp": "2015-05-07T16:55:31+02:00"
            },
            "Body": {
                "Data": {
                    "DAY_ENERGY": {
                        "Value": 26000,
                        "Unit": "Wh"
                    },
                    "FAC": {
                        "Value": 49.97,
                        "Unit": "Hz"
                    },
                    "IAC": {
                        "Value": 5.4,
                        "Unit": "A"
                    },
                    "IDC": {
                        "Value": 3.78,
                        "Unit": "A"
                    },
                    "PAC": {
                        "Value": 1251,
                        "Unit": "W"
                    },
                    "TOTAL_ENERGY": {
                        "Value": 2376359,
                        "Unit": "Wh"
                    },
                    "UAC": {
                        "Value": 228,
                        "Unit": "V"
                    },
                    "UDC": {
                        "Value": 428.7,
                        "Unit": "V"
                    },
                    "YEAR_ENERGY": {
                        "Value": 2005598,
                        "Unit": "Wh"
                    },
                    "DeviceStatus": {
                        "StatusCode": 7,
                        "MgmtTimerRemainingTime": -1,
                        "ErrorCode": 0,
                        "LEDColor": 2,
                        "LEDState": 0,
                        "StateToReset": false
                    }
                }
            }
        }));
        return;
    } else if (normalize(requestUrl.path) === resourcePaths.COMPONENTS) {
        console.log("200 OK");
        response.writeHead(200, {
            "Content-Type": "application/json; charset=ISO-8859-1"
        });
        response.end(JSON.stringify({
            "Head": {
                "RequestArguments": {
                    "resource": "5\/0\/",
                    "print": "names"
                },
                "Status": {
                    "Code": 0,
                    "Reason": "",
                    "UserMessage": "",
                    "ErrorDetail": {
                        "Nodes": []
                    }
                },
                "Timestamp": "2016-02-25T11:23:46+01:00"
            },
            "Body": {
                "Data": {
                    "TimeStamp": {
                        "value": 1456395825,
                        "unit": "sec"
                    },
                    "Enable": {
                        "value": 1,
                        "unit": "1"
                    },
                    "Visible": {
                        "value": 1,
                        "unit": "1"
                    },
                    "Power_P_Generate": {
                        "value": 629,
                        "unit": "W"
                    },
                    "Power_P_Load": {
                        "value": -2883.25,
                        "unit": "W"
                    },
                    "Power_P_Grid": {
                        "value": 2254.25,
                        "unit": "W"
                    },
                    "Power_Akku_Sum": {
                        "value": null,
                        "unit": "W"
                    },
                    "Power_PV_Sum": {
                        "value": 629,
                        "unit": "W"
                    },
                    "Relative_Current_SelfConsumption": {
                        "value": 100,
                        "unit": "%"
                    },
                    "Relative_Current_Autonomy": {
                        "value": 21.815659,
                        "unit": "%"
                    },
                    "Power_P_SelfConsumption": {
                        "value": -629,
                        "unit": "W"
                    }
                }
            }
        }));
        return;
    } else if (normalize(requestUrl.path) === resourcePaths.POWER_FLOW_REALTIME_DATA) {
        console.log("200 OK");
        response.writeHead(200, {
            "Content-Type": "application/json; charset=ISO-8859-1"
        });
        response.end(JSON.stringify({
            "Head": {
                "RequestArguments": {},
                "Status": {
                    "Code": 0,
                    "Reason": "",
                    "UserMessage": ""
                },
                "Timestamp": "2016-03-25T15:19:21+01:00"
            },
            "Body": {
                "Data": {
                    "Site": {
                        "Mode": "produce-only",
                        "P_Grid": null,
                        "P_Load": null,
                        "P_Akku": null,
                        "P_PV": 291,
                        "E_Day": 7653,
                        "E_Year": 841228,
                        "E_Total": 7978902
                    },
                    "Inverters": {
                        "1": {
                            "DT": 110,
                            "P": 291
                        }
                    }
                }
            }
        }));
        return;
    } else if (normalize(requestUrl.path) === resourcePaths.METER_REALTIME_DATA) {
        console.log("200 OK");
        response.writeHead(200, {
            "Content-Type": "application/json; charset=ISO-8859-1"
        });
        response.end(JSON.stringify({
                "Body": {
                    "Data": {
                        "Current_AC_Phase_1": 0.71899999999999997,
                        "Current_AC_Phase_2": 0.67400000000000004,
                        "Current_AC_Phase_3": 1.1259999999999999,
                        "Details": {
                            "Manufacturer": "Fronius",
                            "Model": "Smart Meter 63A",
                            "Serial": "1234567890"
                        },
                        "Enable": 1,
                        "EnergyReactive_VArAC_Sum_Consumed": 27190,
                        "EnergyReactive_VArAC_Sum_Produced": 59830,
                        "EnergyReal_WAC_Minus_Absolute": 4776,
                        "EnergyReal_WAC_Plus_Absolute": 9453,
                        "EnergyReal_WAC_Sum_Consumed": 9453,
                        "EnergyReal_WAC_Sum_Produced": 4776,
                        "Frequency_Phase_Average": 50,
                        "Meter_Location_Current": 0,
                        "PowerApparent_S_Phase_1": 170.54679999999999,
                        "PowerApparent_S_Phase_2": 159.87280000000001,
                        "PowerApparent_S_Phase_3": 266.97459999999995,
                        "PowerApparent_S_Sum": 181.72,
                        "PowerFactor_Phase_1": -0.11,
                        "PowerFactor_Phase_2": -0.88,
                        "PowerFactor_Phase_3": 0.70999999999999996,
                        "PowerFactor_Sum": 0.050000000000000003,
                        "PowerReactive_Q_Phase_1": -96.5,
                        "PowerReactive_Q_Phase_2": -22.300000000000001,
                        "PowerReactive_Q_Phase_3": -62.920000000000002,
                        "PowerReactive_Q_Sum": -181.72,
                        "PowerReal_P_Phase_1": -11.470000000000001,
                        "PowerReal_P_Phase_2": -42.57,
                        "PowerReal_P_Phase_3": 64.310000000000002,
                        "PowerReal_P_Sum": 10.27,
                        "TimeStamp": 1565330259,
                        "Visible": 1,
                        "Voltage_AC_PhaseToPhase_12": 410.80000000000001,
                        "Voltage_AC_PhaseToPhase_23": 410.80000000000001,
                        "Voltage_AC_PhaseToPhase_31": 410.80000000000001,
                        "Voltage_AC_Phase_1": 237.19999999999999,
                        "Voltage_AC_Phase_2": 237.19999999999999,
                        "Voltage_AC_Phase_3": 237.09999999999999
                    }
                },
                "Head": {
                    "RequestArguments": {
                        "DeviceClass": "Meter",
                        "DeviceId": "0",
                        "Scope": "Device"
                    },
                    "Status": {
                        "Code": 0,
                        "Reason": "",
                        "UserMessage": ""
                    },
                    "Timestamp": "2019-08-09T07:57:40+02:00"
                }
            }

        ));
    } else if (normalize(requestUrl.path) === resourcePaths.STORAGE_REALTIME_DATA) {
        console.log("200 OK");
        response.writeHead(200, {
            "Content-Type": "application/json; charset=ISO-8859-1"
        });
        response.end(JSON.stringify({
            "Body": {
                "Data": {}
            },
            "Head": {
                "RequestArguments": {
                    "DeviceClass": "Storage",
                    "DeviceId": "0",
                    "Scope": "Device"
                },
                "Status": {
                    "Code": 0,
                    "Reason": "",
                    "UserMessage": ""
                },
                "Timestamp": "2019-08-09T07:59:05+02:00"
            }
        }));
    } else {
        console.log("404 Not Found");
        response.writeHead(404, {
            "Content-Type": "text/plain"
        });
        response.write("404 Not Found\n");
        response.end();
        return;
    }
}

if (useDigestAuth) {
    var digest = auth.digest({
        realm: realm
    }, function (username, callback) { // Expecting md5(username:realm:password) in callback.
        if (username === "admin") {
            var hash = crypto.createHash('md5');
            hash.update("admin:" + realm + ":admin");
            callback(hash.digest('hex'));
        } else {
            callback();
        }
    });
    http.createServer(digest, requestListener).listen(parseInt(port, 10));
} else {
    http.createServer(requestListener).listen(parseInt(port, 10));
}

console.log("Server running at\n  => http://localhost:" + parseInt(port, 10) + "/\nCTRL + C to shutdown");