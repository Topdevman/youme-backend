"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController = require("../controllers/user");
const seasonController = require("../controllers/season");
function baserouter(router) {
    router.post('/users', userController.register);
    router.post('/seasons', seasonController.register);
    router.delete('/users/:_id', userController.remove);
    router.delete('/seasons/:_id', seasonController.remove);
    router.get('/users', userController.users);
    router.get('/seasons', seasonController.seasons);
}
exports.default = baserouter;
