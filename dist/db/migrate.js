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
function migrate() {
    let userModel = new user_1.default();
    let authToken = new auth_1.default(userModel);
    let seasonModel = new season_1.default();
    let episodeModel = new episode_1.default(seasonModel);
    let momentModel = new moment_1.default(episodeModel);
    let stepModel = new step_1.default(momentModel);
    let step_progressModel = new step_progress_1.default(stepModel, userModel);
    let analysis_resultModel = new analysis_result_1.default(stepModel, userModel);
    index_1.default.sync({ force: false }).then(() => {
        userModel.init();
    });
}
exports.default = migrate;
