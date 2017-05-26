// import userController = require('../controllers/user');
// import seasonController = require('../controllers/season');
// import episodeController = require('../controllers/episode');
// import momentController = require('../controllers/moment');
// import stepController = require('../controllers/step');
// import stepProgressController = require('../controllers/step_progress');
// import analysisController = require('../controllers/analysis_result');
// import authController = require('../controllers/auth');

// export default function baserouter (router) {

//     router.post('/login', authController.authenticate, authController.serialize,
//         authController.generateToken, authController.sendAuthToken); 
//     router.post('/users', userController.register);
//     router.post('/seasons', authController.checkAuthToken, authController.checkAuthTokenValid, seasonController.register);
//     router.post('/episodes', authController.checkAuthToken, authController.checkAuthTokenValid, seasonController.checkSeasonExist, episodeController.register);
//     router.post('/moments', authController.checkAuthToken, authController.checkAuthTokenValid, episodeController.checkEpisodeExist, momentController.register);
//     router.post('/steps', authController.checkAuthToken, authController.checkAuthTokenValid, momentController.checkMomentExist, stepController.register);
//     router.post('/progresses', authController.checkAuthToken, authController.checkAuthTokenValid, userController.checkUserExist, stepController.checkStepExist, stepProgressController.register);
//     router.post('/analysis', authController.checkAuthToken, authController.checkAuthTokenValid, userController.checkUserExist, stepController.checkStepExist, analysisController.register);

//     router.delete('/users/:_id', authController.checkAuthToken, authController.checkAuthTokenValid, userController.remove);
//     router.delete('/seasons/:_id', authController.checkAuthToken, authController.checkAuthTokenValid, seasonController.remove);
//     router.delete('/episodes/:_id', authController.checkAuthToken, authController.checkAuthTokenValid, episodeController.remove);
//     router.delete('/moments/:_id', authController.checkAuthToken, authController.checkAuthTokenValid, momentController.remove);
//     router.delete('/steps/:_id', authController.checkAuthToken, authController.checkAuthTokenValid, stepController.remove);
//     router.delete('/progresses/:_id', authController.checkAuthToken, authController.checkAuthTokenValid, stepProgressController.remove);
//     router.delete('/analysis/:_id', authController.checkAuthToken, authController.checkAuthTokenValid, analysisController.remove);

//     router.get('/users', authController.checkAuthToken, authController.checkAuthTokenValid, userController.users);
//     router.get('/seasons', authController.checkAuthToken, authController.checkAuthTokenValid, seasonController.seasons);
//     router.get('/episodes', authController.checkAuthToken, authController.checkAuthTokenValid, episodeController.episodes);
//     router.get('/moments', authController.checkAuthToken, authController.checkAuthTokenValid, momentController.moments);
//     router.get('/steps', authController.checkAuthToken, authController.checkAuthTokenValid, stepController.steps);
//     router.get('/progresses', authController.checkAuthToken, authController.checkAuthTokenValid, stepProgressController.step_progresses);
//     router.get('/analysis', authController.checkAuthToken, authController.checkAuthTokenValid, analysisController.analysis_results);
// }