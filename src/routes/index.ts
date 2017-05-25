import userController = require('../controllers/user');
import seasonController = require('../controllers/season');
import episodeController = require('../controllers/episode');
import momentController = require('../controllers/moment');
import stepController = require('../controllers/step');

export default function baserouter (router) {
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