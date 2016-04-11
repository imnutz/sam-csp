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

module.exports = { fetchContacts };