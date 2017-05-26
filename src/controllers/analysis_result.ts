import userModel from '../models/user';
import seasonModel from '../models/season';
import * as sequelize from '../models/index';
import episodeModel from '../models/episode';
import momentModel from '../models/moment';
import stepModel from '../models/step';
import analysis_resultModel from '../models/analysis_result';

let User = new userModel();
let Season = new seasonModel();
let Episode = new episodeModel(Season);
let Moment = new momentModel(Episode);
let Step = new stepModel(Moment);
let Analysis_result = new analysis_resultModel(Step, User);

export function register(req, res) {
   
    const step_id = req.body.step_id;
    const user_id = req.body.user_id;
    const name = req.body.name;
    const result = req.body.result;
    Analysis_result.save(step_id, user_id, name, result)
        .then(analysis_result => res.status(201).json(analysis_result))
        .catch(error => res.status(400));
    return;
}

export function analysis_results(req, res) {
   
    if (req.query.step_id) {
        Analysis_result.findByStepID(req.query.step_id).then(analysis_result => res.json(analysis_result)).catch(error => res.send(error));
    } else if (req.query.user_id) {
        Analysis_result.findByUserID(req.query.user_id).then(analysis_result => res.json(analysis_result)).catch(error => res.send(error));
    } else if (req.query.analysis_result_id) {
        Analysis_result.findByUserID(req.query.analysis_result_id).then(analysis_result => res.json(analysis_result)).catch(error => res.send(error));
    } else if (req.query.name) {
        Analysis_result.findByAnalysis_resultName(req.query.name).then(analysis_result => res.json(analysis_result)).catch(error => res.send(error));
    } else {
        Analysis_result.loadAll().then(analysys_result => res.json(analysys_result)).catch(error => res.send(error));
    }
}

export function remove(req, res) {
    
    let id = req.params._id;    
    Analysis_result.removeAnalysis_resultByID(id).then(analysis_result => res.json(analysis_result));
}
