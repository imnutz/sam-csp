"use strict";

const run = (state, actions, model, view, services) => {
    model.setServices(services);

    state.init(model.out, view, actions);
    actions.init(model.in);

    view.display(view.init(model.init(), actions));
};

module.exports = { run };