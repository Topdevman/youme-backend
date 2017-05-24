import userModel from '../models/user';
import * as sequelize from '../models/index';


export function register(req, res) {
    let User = new userModel();
    User.save(req.body)
        .then(user => res.status(201).json(user));
}

export function users(req, res) {
    let User = new userModel();
    User.loadAll().then(user => res.json(user)).catch(error => res.send(error));
}

export function remove(req, res) {
    let id = req.params._id;
    let User = new userModel();
    User.removeUserByID(id).then(user => res.json(user));
}