"use strict";
let csp = require("js-csp");

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
        let representation = _view.ready(model, _actions);
        _view.display(representation);
    },

    nap: (model) => {
        if(model.updatingDone || model.addingDone || model.cancelledForm || model.deletingDone) {
            _actions.selectRoute("contacts");
        }
    }
};

module.exports = state;