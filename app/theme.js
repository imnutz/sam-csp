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

    contactList: (contacts) => {
        return h("h3", "This is the container for contact list!");
    },

    about: () => {
        return h("p", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et maxime animi sunt voluptatem fuga doloribus quod dolores consequuntur. Minus inventore impedit recusandae nisi neque deserunt soluta vero tempora officia odit.");
    }
};

module.exports = theme;