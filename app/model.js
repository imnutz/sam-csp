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

const init = () => model;

go(function* present() {
    while(true) {
        let data = yield take(chIn);

        if(data.route) {
            model.route = data.route;
        }

        model.fetchingContacts = data.fetchingContacts || false;
        model.contacts = data.contacts || [];

        model.editedId = data.editedId;
        model.fetchingContact = data.fetchingContact;

        model.creatingContact = data.creatingContact;
        model.contactCreated = data.contactCreated;

        model.updatingContact = data.updatingContact;
        model.contactUpdated = data.contactUpdated;

        model.deletingContact = data.deletingContact;
        model.contactDeleted = data.contactDeleted;
        model.deletedId = data.deletedId;
        model.cancelCrud = data.cancelCrud;

        if(model.deletingContact) {
            let confirm = window.confirm("Do you really want to delete this contact?");
            if(confirm) {
                model.okForDeleting = true;
            } else {
                model.okForDeleting = false;
                model.cancelCrud = true;
            }
        }

        model.contact = data.contact;

        putAsync(chOut, model);
    }
});

module.exports = { in: chIn, out: chOut, init };