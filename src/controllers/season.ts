import seasonModel from '../models/season';
import * as sequelize from '../models/index';


export function register(req, res) {
    let Season = new seasonModel();
    Season.save(req.body)
        .then(season => res.status(201).json(season));
}

export function seasons(req, res) {
    let Season = new seasonModel();
    Season.loadAll().then(season => res.json(season)).catch(error => res.send(error));
}

export function remove(req, res) {
    let id = req.params._id;
    let Season = new seasonModel();
    Season.removeSeasonByID(id).then(season => res.json(season));
}