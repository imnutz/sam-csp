"use strict";

let putAsync = require("js-csp").putAsync;

let _channel;

let actions = {
    init: (channel) => {
        _channel = channel;
    },

    selectRoute: (route) => {
        putAsync(_channel, { route: route });
    }
};

module.exports = actions;