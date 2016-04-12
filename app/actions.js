"use strict";

let putAsync = require("js-csp").putAsync;

let _channel;

let actions = {
    init: (channel) => {
        _channel = channel;
    },

    selectRoute: (route) => {
        putAsync(_channel, { route: route });
    },

    edit: (id) => {
        putAsync(_channel, {
            editedId: id,
            route: "editForm"
        });
    },

    delete: (id) => {}
};

module.exports = actions;