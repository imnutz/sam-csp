"use strict";
let h = require("snabbdom/h");
let csp = require("js-csp");
let theme = require("./theme");

let take = csp.take,
    go = csp.go;

let _view, _actions;

let state = {
    init: (channel, view, actions) => {
        _view = view;
        _actions = actions;

        go(function* render() {
            while(true) {
                let model = yield take(channel);

                state.representation(model);
                state.nap(model);
            }
        })
    },

    representation: (model) => {
        let content = theme.home();

        if(model.route === "contacts" && model.contacts.length) {
            content = theme.contactList(model.contacts || [], _actions);
        } else if(model.route === "addForm") {
            content = theme.contactForm({}, _actions, true);
        } else if(model.route === "editForm" && model.contact) {
            content = theme.contactForm(model.contact, _actions, false);
        } else if(model.route === "about") {
            content = theme.about();
        }

        let representation =  h("div.app-container", [
            theme.header(model.appName, model.menu, _actions),
            content,
            theme.footer()
        ]);

        _view.display(representation);
    },

    doneCrud: (model) => {
        return (model.contactCreated || model.contactUpdated || model.contactDeleted || model.cancelCrud);
    },

    nap: (model) => {
        if(model.fetchingContacts) {
            _actions.fetchContacts();
        } else if(model.fetchingContact) {
            _actions.fetchContact(model.editedId);
        } else if(model.creatingContact) {
            _actions.createContact({
                firstName: model.contact.firstName,
                lastName: model.contact.lastName
            });
        } else if(state.doneCrud(model)) {
            _actions.selectRoute("contacts");
        } else if(model.updatingContact) {
            _actions.updateContact({
                id: model.contact.id,
                firstName: model.contact.firstName,
                lastName: model.contact.lastName
            });
        } else if(model.deletingContact && model.okForDeleting) {
            _actions.deleteContact(model.deletedId);
        }
    }
};

module.exports = state;