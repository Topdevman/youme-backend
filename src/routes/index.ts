import userController = require('../controllers/user');
import seasonController = require('../controllers/season');
import episodeController = require('../controllers/episode');

export default function baserouter (router) {
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