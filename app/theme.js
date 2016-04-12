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
        return h("h3", "Welcome to my Contact Manager");
    },

    contactList: (contacts, actions) => {
        return h("div.contact-list", [
            h("h1", "Contacts"),
            h("div.data-list", [
                h("table", [
                    theme.contactListHeader(),
                    theme.contactListBody(contacts, actions)
                ])
            ])
        ]);
    },

    contactListHeader: () => {
        return h("thead", [
            h("tr", [
                h("th", "First name"),
                h("th", "Last name")
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
        return contactForm(contact, actions);
    },

    contactForm: (contact = {}, actions) => {
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

        return h("div.form", [
            h("h3", "Contact Info"),
            h("div.form-field", [
                h("label", "First name"),
                h("input", {props:{type:"text"}, on:{change: setFirstName}})
            ]),

            h("div.form-field", [
                h("label", "Last name"),
                h("input", {props:{type:"text"}, on:{change: setLastName}})
            ]),

            h("div.btns", [
                h("button", "Save"),
                h("button", "Delete")
            ])
        ]);
    }

    about: () => {
        return h("p", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et maxime animi sunt voluptatem fuga doloribus quod dolores consequuntur. Minus inventore impedit recusandae nisi neque deserunt soluta vero tempora officia odit.");
    }
};

module.exports = theme;