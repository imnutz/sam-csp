"use strict";

let csp = require("js-csp");

let take = csp.take,
    put = csp.put,
    go = csp.go;

let chIn = csp.chan(),
    chOut = csp.chan();

let model = {
    appName: "Contact Manager",
    appDescription: "with SAM and CSP",
    menu: [
        { title: "Contacts", route: "contacts"},
        { title: "About", route: "route" }
    ],

    route: "home"
};

go(function*() {
    while(true) {
        let data = yield take(chIn);

        if(data.route) {
            model.route = data.route;
        }

        put(chOut, model);
    }
});

module.exports = { in: chIn, out: chOut };