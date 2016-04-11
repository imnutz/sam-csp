"use strict";

let _channel;

let actions = {
    init: (channel) => {
        _channel = channel;
    }
};

module.exports = actions;