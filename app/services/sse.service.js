"use strict";

const SseChannel = require("sse-channel");

const sysInfoChannel = new SseChannel({
    retryTimeout: 250,
    historySize: 300,
    pingInterval: 15000,
    jsonEncode: true,
    cors: {
        origins: ["*"], // Defaults to [],
        headers: ["Access-Control-Allow-Origin"]
    }
});

module.exports = sysInfoChannel;
