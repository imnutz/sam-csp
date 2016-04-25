"use strict";

let csp = require("js-csp");
let putAsync = csp.putAsync;
let take = csp.take;

let _channel,
    _services;

let actions = {
    init: (channel) => {
        _channel = channel;
    },

    selectContactList: (data = {}) => {
        data.fetchingContacts = true;

        putAsync(_channel, data);
    },

    selectHome: (data = {}) => {
        putAsync(_channel, data);
    },

    selectAbout: (data = {}) => {
        putAsync(_channel, data);
    },

    selectRoute: (route) => {
        let data = {
            route: route
        };

        if(route === "contacts") {
            actions.selectContactList(data);
        } else if(route === "about") {
            actions.selectAbout(data);
        } else if(route === "home") {
            actions.selectHome(data);
        }
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
        data.updatingContact = true;
        data.contact = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName
        };
        putAsync(_channel, data);
    },

    save: (data = {}) => {
        data.route = "save";
        data.creatingContact = true;
        data.contact = {
            firstName: data.firstName,
            lastName: data.lastName
        };

        putAsync(_channel, data);
    },

    delete: (id) => {
        let data = {
            deletedId: id,
            route: "delete"
        };

        putAsync(_channel, data);
    },

    cancelForm: () => {
        putAsync(_channel, { route: "cancelForm", cancelCrud: true });
    }
};

module.exports = actions;