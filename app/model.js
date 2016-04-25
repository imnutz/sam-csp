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
const setServices = (services) => _services = services;
const init = () => model;

go(function* present() {
    while(true) {
        let data = yield take(chIn);

        if(data.route) {
            model.route = data.route;
        }

        model.cancelCrud = data.cancelCrud;

        if (data.fetchingContacts) {
            model.contactCreated = false;
            model.contactUpdated = false;
            model.contactDeleted = false;

            model.contacts = yield take(_services.fetchContacts());
        }

        if(data.creatingContact) {
            let response = yield take(_services.createContact(
                {
                    firstName: data.firstName,
                    lastName: data.lastName
                }
            ));

            model.contactCreated = true;
        }

        if(data.editedId) {
            model.editedId = data.editedId;
            model.contact = yield take(_services.fetchContact(model.editedId));
        }

        if(data.updatingContact) {
            let response = yield take(_services.updateContact(
                {
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName
                }
            ));

            model.contactUpdated = true;
        }

        if(data.deletedId) {
            model.deletedId = data.deletedId;

            let confirmation = window.confirm("Do you really want to delete this contact?");
            if(confirmation) {
                yield take(_services.deleteContact(model.deletedId));
                model.contactDeleted = true;
            }
        }

        // model.editedId = data.editedId;
        // model.fetchingContact = data.fetchingContact;

        // model.creatingContact = data.creatingContact;
        // model.contactCreated = data.contactCreated;

        // model.updatingContact = data.updatingContact;
        // model.contactUpdated = data.contactUpdated;

        // model.deletingContact = data.deletingContact;
        // model.contactDeleted = data.contactDeleted;
        // model.deletedId = data.deletedId;
        // model.cancelCrud = data.cancelCrud;

        // if(model.deletingContact) {
        //     let confirm = window.confirm("Do you really want to delete this contact?");
        //     if(confirm) {
        //         model.okForDeleting = true;
        //     } else {
        //         model.okForDeleting = false;
        //         model.cancelCrud = true;
        //     }
        // }

        // model.contact = data.contact;

        putAsync(chOut, model);
    }
});

module.exports = { in: chIn, out: chOut, init, setServices };