"use strict";
let csp = require("js-csp");

let take = csp.take,
    go = csp.go;

let _view, _actions;

let state = {
    init: (channel, view, actions) => {
        _view = view;
        _actions = actions; 

        go(function*() {
            while(true) {
                let model = yield take(channel);

                let representation = state.representation(model);
                _view.display(representation);
            }
        })
    },

    representation: (model) => {
        return _view.ready(model, _actions);
    }
};

module.exports = state;