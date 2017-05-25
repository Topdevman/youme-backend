"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController = require("../controllers/user");
const seasonController = require("../controllers/season");
const episodeController = require("../controllers/episode");
function baserouter(router) {
    router.post('/users', userController.register);
    router.post('/seasons', seasonController.register);
    router.post('/episodes', seasonController.checkSeasonExist, episodeController.register);
    router.delete('/users/:_id', userController.remove);
    router.delete('/seasons/:_id', seasonController.remove);
    router.delete('/episodes/:_id', episodeController.remove);
    router.get('/users', userController.users);
    router.get('/seasons', seasonController.seasons);
    router.get('/episodes', episodeController.episodes);
}
exports.default = baserouter;
