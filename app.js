"use strict";

require("babel-polyfill");

let binder = require("./app/main");
let state = require("./app/state");
let model = require("./app/model");
let actions = require("./app/actions");
let view = require("./app/view");
let services = require("./app/services");

binder.run(state, actions, model, view, services);