"use strict";

let h = require("snabbdom/h");

let theme = {
    header: (menu, actions) => {
        return h("h1", "Contact Manager")
    }
};

module.exports = theme;