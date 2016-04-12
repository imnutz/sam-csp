"use strict";

let putAsync = require("js-csp").putAsync;

let _channel;

let actions = {
    init: (channel) => {
        _channel = channel;
    },

    selectRoute: (route) => {
        let data = {
            route: route,
            updatingDone: false,
            addingDone: false,
            cancelledForm: false,
            deletingDone: false
        };

        putAsync(_channel, data);
    },

    edit: (id) => {
        putAsync(_channel, {
            editedId: id,
            route: "editForm"
        });
    },

    add: () => {
        putAsync(_channel, { route: "addForm" });
    },

    update: (data = {}) => {
        data.route = "update";
        putAsync(_channel, data);
    },

    save: (data = {}) => {
        data.route = "save";
        putAsync(_channel, data);
    },

    delete: (id) => {
        let data = {
            id: id,
            route: "delete"
        };

        putAsync(_channel, data);
    },

    cancelForm: () => {
        putAsync(_channel, { route: "cancelForm" });
    }
};

module.exports = actions;