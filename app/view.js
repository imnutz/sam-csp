"use strict";
let patch = require("snabbdom").init([
    require('snabbdom/modules/class'),
    require('snabbdom/modules/props'),
    require('snabbdom/modules/style'),
    require('snabbdom/modules/eventlisteners')
]);
let h = require("snabbdom/h");
let theme = require("./theme");

let vnode = document.querySelector("#contact-manager");

let view = {
    init: (model, actions) => {
        return view.ready(model, actions);
    },

    ready: (model, actions) => {
        let mainContent = theme.home();

        if(model.route === "contacts") {
            mainContent = theme.contactList({});
        } else if(model.route === "about") {
            mainContent = theme.about();
        }

        return h("div.app-container", [
            theme.header(model.appName, model.menu, actions),
            mainContent
        ]);
    },

    display: (representation) => {
        vnode = patch(vnode, representation);
    }
};

module.exports = view;