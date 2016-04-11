"use strict";

let binder = require("./app/binder");
let state = require("./app/state");
let model = require("./app/model");
let actions = require("./app/actions");
let view = require("./app/view");

binder(state, model, actions);

view.display(view.init(model.init(), actions));