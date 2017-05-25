"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController = require("../controllers/user");
const seasonController = require("../controllers/season");
const episodeController = require("../controllers/episode");
const momentController = require("../controllers/moment");
const stepController = require("../controllers/step");
function baserouter(router) {
    router.post('/users', userController.register);
    router.post('/seasons', seasonController.register);
    router.post('/episodes', seasonController.checkSeasonExist, episodeController.register);
    router.post('/moments', episodeController.checkEpisodeExist, momentController.register);
    router.post('/steps', momentController.checkMomentExist, stepController.register);
    router.delete('/users/:_id', userController.remove);
    router.delete('/seasons/:_id', seasonController.remove);
    router.delete('/episodes/:_id', episodeController.remove);
    router.delete('/moments/:_id', momentController.remove);
    router.delete('/steps/:_id', stepController.remove);
    router.get('/users', userController.users);
    router.get('/seasons', seasonController.seasons);
    router.get('/episodes', episodeController.episodes);
    router.get('/moments', momentController.moments);
    router.get('/steps', stepController.steps);
}
exports.default = baserouter;
