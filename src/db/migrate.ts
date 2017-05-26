import User from '../models/user';
import Season from '../models/season';
import Episode from '../models/episode';
import Moment from '../models/moment';
import Step from '../models/step';
import Step_progress from '../models/step_progress';
import Analysis_result from '../models/analysis_result';
import AuthToken from '../models/auth';
import sequelize from '../models/index';


export default function migrate() {
    let userModel = new User();
    let authToken = new AuthToken(userModel);
    let seasonModel = new Season();
    let episodeModel = new Episode(seasonModel);
    let momentModel = new Moment(episodeModel);
    let stepModel = new Step(momentModel);
    let step_progressModel = new Step_progress(stepModel, userModel);
    let analysis_resultModel = new Analysis_result(stepModel, userModel);

    sequelize.sync({force: false}).then(() => {
        userModel.init();
    });
}

