import userModel from '../models/user';
import seasonModel from '../models/season';
import * as sequelize from '../models/index';
import episodeModel from '../models/episode';
import momentModel from '../models/moment';
import stepModel from '../models/step';
import step_progressModel from '../models/step_progress';

let User = new userModel();
let Season = new seasonModel();
let Episode = new episodeModel(Season);
let Moment = new momentModel(Episode);
let Step = new stepModel(Moment);
let Step_progress = new step_progressModel(Step, User);

export function register(req, res) {
   
    const step_id = req.body.step_id;
    const user_id = req.body.user_id;
    const name = req.body.name;
    Step_progress.save(step_id, user_id, name)
        .then(step_progress => res.status(201).json(step_progress))
        .catch(error => res.status(400));
    return;
}

export function step_progresses(req, res) {
   
    if (req.query.step_id) {
        Step_progress.findByStepID(req.query.step_id).then(step_progress => res.json(step_progress)).catch(error => res.send(error));
    } else if (req.query.user_id) {
        Step_progress.findByUserID(req.query.user_id).then(step_progress => res.json(step_progress)).catch(error => res.send(error));
    } else if (req.query.step_progress_id) {
        Step_progress.findByStep_progressID(req.query.step_progress_id).then(step_progress => res.json(step_progress)).catch(error => res.send(error));
    } else if (req.query.name) {
        Step_progress.findByStep_progressName(req.query.name).then(step_progress => res.json(step_progress)).catch(error => res.send(error));
    } else {
        Step_progress.loadAll().then(step_progress => res.json(step_progress)).catch(error => res.send(error));
    }
}

export function remove(req, res) {
    
    let id = req.params._id;    
    Step_progress.removeStep_progressByID(id).then(step_progress => res.json(step_progress));
}
