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
    contacts: [],

    updatingDone: false,
    addingDone: false,
    cancelledForm: false,
    deletingDone: false
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

        model.updatingDone = data.updatingDone || false;
        model.addingDone = data.addingDone || false;
        model.cancelledForm = data.cancelledForm || false;
        model.deletingDone = data.deletingDone || false;

        if(model.route === "contacts") {
            contacts = yield take(_services.fetchContacts());
            model.contacts = contacts || [];
        } else if(model.route === "editForm") {
            model.editedId = data.editedId;
            model.contact = yield take(_services.fetchContact(model.editedId));
        } else if(model.route === "update") {
            let updateResponse = yield take(_services.updateContact({
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName
            }));

            if(updateResponse instanceof Error) {
                model.updatingDone = false;
            } else {
                model.updatingDone = true;
            }
        } else if(model.route === "save") {
            let addingResponse = yield take(_services.createContact({
                firstName: data.firstName,
                lastName: data.lastName
            }));

            if(addingResponse instanceof Error) {
                model.addingDone = false;
            } else {
                model.addingDone = true;
            }
        } else if(model.route === "cancelForm") {
            model.cancelledForm = true;
        } else if(model.route === "delete") {
            model.deletedId = data.id;

            let confirmation = confirm("Do your really want to delete the contact?");
            if(confirmation) {
                let deleteResponse = yield take(_services.deleteContact(model.deletedId));

                if(deleteResponse instanceof Error) {
                    model.deletingDone = false;
                } else {
                    model.deletingDone = true;
                }
            } else {
                model.deletingDone = true;
            }
        }

        putAsync(chOut, model);
    }
});

module.exports = { in: chIn, out: chOut, init, setUp };