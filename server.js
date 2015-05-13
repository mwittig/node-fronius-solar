var http = require("http"),
    url = require("url"),
    path = require("path"),
    port = process.argv[2] || 8001;

http.createServer(function(request, response) {

    var uri = url.parse(request.url).pathname;
    console.log("uri", uri);
    if (uri === '/solar_api/v1/GetInverterRealtimeData.cgi') {
        response.writeHead(200, {
            "Content-Type": "application/json; charset=ISO-8859-1"
        });
        response.end(JSON.stringify(
            {
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
            }
        ));
        return;
    }
    else {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
        return;
    }
}).listen(parseInt(port, 10));

console.log("Server running at\n  => http://localhost:" + parseInt(port, 10) + "/\nCTRL + C to shutdown");