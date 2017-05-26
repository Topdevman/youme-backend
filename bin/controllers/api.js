"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("./Controller");
const user_1 = require("./user");
const episode_1 = require("./episode");
const moment_1 = require("./moment");
const season_1 = require("./season");
const step_1 = require("./step");
const step_progress_1 = require("./step_progress");
const auth_1 = require("./auth");
const analysis_result_1 = require("./analysis_result");
class APIController extends Controller_1.Controller {
    constructor(app) {
        super("/", app);
        let userController = new user_1.UserController(this.router);
        let authController = new auth_1.AuthController(this.router);
        let seasonController = new season_1.SeasonController(this.router);
        let episodeController = new episode_1.EpisodeController(this.router);
        let momentController = new moment_1.MomentController(this.router);
        let stepController = new step_1.StepController(this.router);
        let stepProgressController = new step_progress_1.StepProgressController(this.router);
        let analysisResultController = new analysis_result_1.AnalysisResultController(this.router);
    }
}
exports.APIController = APIController;
