"use strict";

module.exports = (state, actions, model) => {
    state.init(model.out);
    actions.init(model.in);
}