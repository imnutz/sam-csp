"use strict";

let csp = require("js-csp");

let take = csp.take,
    go = csp.go;

let state = {
    init: (channel) => {
        go(function*() {
            while(true) {
                let model = yield take(channel);
            }
        })
    }
};

module.exports = state;