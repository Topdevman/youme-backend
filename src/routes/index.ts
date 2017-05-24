// import errorhandler = require('errorhandler');
import userController = require('../controllers/user');
import seasonController = require('../controllers/season');

export default function baserouter (router) {
    router.post('/users', userController.register);
    router.post('/seasons', seasonController.register);

    router.delete('/users/:_id', userController.remove);
    router.delete('/seasons/:_id', seasonController.remove);

    router.get('/users', userController.users);
    router.get('/seasons', seasonController.seasons);
}