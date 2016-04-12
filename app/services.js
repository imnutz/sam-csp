"use strict";

let reqwest = require("reqwest");
let csp = require("js-csp");

let ROOT_URL = "http://localhost:3000";
let CONTACTS_URL = ROOT_URL + "/contacts";

let putAsync = csp.putAsync;

const fetchContacts = () => {
    let channel = csp.chan();

    reqwest(CONTACTS_URL)
        .then((response) => {
            putAsync(channel, response);
        })
        .catch((e) => {
            putAsync(channel, new Error("Failed to fetch contacts"));
        })

    return channel;
};

const fetchContact = (id) => {
    let channel = csp.chan();

    reqwest([CONTACTS_URL, id].join("/"))
        .then((response) => {
            putAsync(channel, response)
        })
        .catch((e) => {
            putAsync(channel, new Error("Failed to fetch contact with id = " + id));
        });

    return channel;
};

const updateContact = (contact) => {
    let channel = csp.chan();

    reqwest({
        url: [CONTACTS_URL, contact.id].join("/"),
        method: "put",
        data: {
            firstName: contact.firstName,
            lastName: contact.lastName
        }
    }).then((response) => {
        putAsync(channel, response);
    }).catch((e) => {
        putAsync(channel, new Error("Failed to update contact with id = " + id));
    });

    return channel;
};

const createContact = (contact) => {
    let channel = csp.chan();

    reqwest({
        url: CONTACTS_URL,
        method: "post",
        data: {
            firstName: contact.firstName,
            lastName: contact.lastName
        }
    }).then((response) => {
        putAsync(channel, response);
    }).catch((e) => {
        putAsync(channel, new Error("Failed to add new contact"));
    });

    return channel;
};

const deleteContact = (id) => {
    let channel = csp.chan();

    reqwest({
        url: [CONTACTS_URL, id].join("/"),
        method: "delete"
    }).then((response) => {
        putAsync(channel, response);
    }).catch((e) => {
        putAsync(channel, new Error("Failed to delete contact"));
    });
    
    return channel;
};

module.exports = { fetchContacts, fetchContact, updateContact, createContact, deleteContact };