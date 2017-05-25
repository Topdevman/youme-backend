import seasonModel from '../models/season';
import * as sequelize from '../models/index';
import episodeModel from '../models/episode';
import momentModel from '../models/moment';
import stepModel from '../models/step';

let Season = new seasonModel();
let Episode = new episodeModel(Season);
let Moment = new momentModel(Episode);
let Step = new stepModel(Moment);

export function register(req, res) {
   
    const moment_id = req.body.moment_id;
    const name = req.body.name;
    Step.save(moment_id, name)
        .then(step => res.status(201).json(step))
        .catch(error => res.status(400));
    return;
}

export function steps(req, res) {
   
    if (req.query.moment_id) {
        Step.findByMomentID(req.query.moment_id).then(step => res.json(step)).catch(error => res.send(error));
    } else if (req.query.step_id) {
        Step.findByStepID(req.query.step_id).then(step => res.json(step)).catch(error => res.send(error));
    } else if (req.query.name) {
        Step.findByStepname(req.query.name).then(step => res.json(step)).catch(error => res.send(error));
    } else {
        Step.loadAll().then(step => res.json(step)).catch(error => res.send(error));
    }
}

export function remove(req, res) {
    
    let id = req.params._id;    
    Step.removeStepByID(id).then(step => res.json(step));
}

export function checkStepExist(req, res, next) {
    let id = req.body.step_id;
    
    Step.findByStepID(id)
        .then((step) => {
            res.status(201);
            next();
        })
        .catch(error => res.send(error));
    return;
}