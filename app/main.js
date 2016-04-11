"use strict";

const run = (state, actions, model, view, services) => {
    state.init(model.out, view, actions);
    actions.init(model.in);

    model.setUp(services);

    view.display(view.init(model.init(), actions));
};

module.exports = { run };