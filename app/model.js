"use strict";

let csp = require("js-csp");

let take = csp.take,
    putAsync = csp.putAsync,
    go = csp.go;

let chIn = csp.chan(),
    chOut = csp.chan();

let model = {
    appName: "Contact Manager",
    appDescription: "with SAM and CSP",

    menu: [
        { title: "Contacts", route: "contacts"},
        { title: "About", route: "about" }
    ],

    route: "home",
    contacts: []
};

let _services;

const setUp = (services) => _services = services;
const init = () => model;

go(function* present() {
    while(true) {
        let contacts;
        let data = yield take(chIn);

        if(data.route) {
            model.route = data.route;
        }

        if(model.route === "contacts") {
            contacts = yield take(_services.fetchContacts());
            model.contacts = contacts || [];
        } else if(model.route === "editForm") {
            model.editedId = data.editedId;
            contact = yield take(_services.fetchContact(model.editedId));

            if(!contact instanceof Error) {
                model.contact = contact;
            } 
        }

        putAsync(chOut, model);
    }
});

module.exports = { in: chIn, out: chOut, init, setUp };