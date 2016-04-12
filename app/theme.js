"use strict";

let h = require("snabbdom/h");

let theme = {
    header: (appName, menu, actions) => {
        let menuItem = (item) => {
            return h("li", [
                h("a", { props: { href: "#"}, on: {click: [actions.selectRoute, item.route] }}, item.title)
            ]);
        };

        return h("div.header", [
            h("h1", String(appName)),
            h("ul", menu.map(menuItem))
        ]);
    },

    home: () => {
        return h("div.main-content", [
            h("h3", "Welcome to my Contact Manager")
        ]);
    },

    contactList: (contacts, actions) => {
        return h("div.main-content", [
            h("div.contact-list", [
                h("h3", "Contacts"),
                h("div.data-list-header", [
                    h("button", {on:{click:actions.add}}, "Add contact")
                ]),
                h("div.data-list", [
                    h("table", [
                        theme.contactListHeader(),
                        theme.contactListBody(contacts, actions)
                    ])
                ])
            ])
        ]);

    },

    contactListHeader: () => {
        return h("thead", [
            h("tr", [
                h("th", "First name"),
                h("th", "Last name"),
                h("th", "")
            ])
        ])
    },

    contactListBody: (contacts, actions) => {
        let row = (contact) => {
            return h("tr", [
                h("td", String(contact.firstName)),
                h("td", String(contact.lastName)),
                h("td", [
                    h("button", {on:{click:[actions.edit, contact.id]}}, "Edit"),
                    h("button", {on:{click:[actions.delete, contact.id]}}, "Delete"),
                ])
            ]);
        };

        return h("tbody", contacts.map(row));
    },

    edit: (contact = {}, actions) => {
        return theme.contactForm(contact, actions);
    },

    add: (contact = {}, actions) => {
        return theme.contactForm(contact, actions, true);
    },

    contactForm: (contact = {}, actions, isAdding = false) => {
        let firstName = contact.firstName || "",
            lastName = contact.lastName || "";

        // when first name change
        let setFirstName = (evt) => {
            firstName = evt.target.value;
        }

        // when last name change
        let setLastName = (evt) => {
            lastName =  evt.target.value;
        }

        let handler = (evt) => {
            evt.preventDefault();
            let crudHandler = isAdding ? actions.save : actions.update;

            crudHandler.call(null, { id: contact.id, firstName: firstName, lastName: lastName });
        }

        return h("div.main-content", [
            h("div.form", [
                h("h3", "Contact Info"),
                h("div.form-field", [
                    h("label", "First name"),
                    h("input", {props:{type:"text", value: firstName}, on:{change: setFirstName}})
                ]),

                h("div.form-field", [
                    h("label", "Last name"),
                    h("input", {props:{type:"text", value: lastName}, on:{change: setLastName}})
                ]),

                h("div.btns", [
                    h("button", {on:{click:handler}}, "Save"),
                    h("button", {on:{click:actions.cancelForm}}, "Cancel")
                ])
            ])
        ]);
    },

    about: () => {
        return h("div.main-content", [
            h("p", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque laboriosam similique suscipit voluptatem perspiciatis possimus voluptatibus nostrum atque id, ipsa, autem earum et veniam quod voluptas incidunt, porro repudiandae sunt fugit doloribus illum rem dolorem itaque? Suscipit esse nostrum assumenda possimus non, repudiandae asperiores enim tempora quisquam cupiditate perferendis iste.")
        ]);
    },

    footer: () => {
        return h("div.footer", [
            h("p", "Copyright(C) sonngoc(son.ngoc@gmail.com)")
        ]);
    }
};

module.exports = theme;