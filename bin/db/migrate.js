"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const season_1 = require("../models/season");
const episode_1 = require("../models/episode");
const moment_1 = require("../models/moment");
const step_1 = require("../models/step");
const step_progress_1 = require("../models/step_progress");
const analysis_result_1 = require("../models/analysis_result");
const auth_1 = require("../models/auth");
const index_1 = require("../models/index");
class Migrate {
    constructor() {
        let user = new user_1.User();
        let season = new season_1.Season();
        let episode = new episode_1.Episode();
        let moment = new moment_1.Moment();
        let step = new step_1.Step();
        let stepProgress = new step_progress_1.StepProgress();
        let analysisResult = new analysis_result_1.AnalysisResult();
        let authToken = new auth_1.AuthToken();
        index_1.default.sync({ force: false }).then(() => {
            user_1.User.init();
        });
    }
}
exports.Migrate = Migrate;
