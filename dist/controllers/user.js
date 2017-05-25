"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
function register(req, res) {
    let User = new user_1.default();
    User.save(req.body)
        .then(user => res.status(201).json(user));
}
exports.register = register;
function users(req, res) {
    console.log(req.query);
    let User = new user_1.default();
    if (req.query.user_id) {
        User.findByUserID(req.query.user_id).then(user => res.json(user)).catch(error => res.send(error));
        return;
    }
    else if (req.query.user_name) {
        User.findByUsername(req.query.user_name).then(user => res.json(user)).catch(error => res.send(error));
        return;
    }
    else {
        User.loadAll().then(user => res.json(user)).catch(error => res.send(error));
        return;
    }
}
exports.users = users;
function remove(req, res) {
    let id = req.params._id;
    let User = new user_1.default();
    User.removeUserByID(id).then(user => res.json(user));
}
exports.remove = remove;
