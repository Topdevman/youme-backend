import userModel from '../models/user';
import * as sequelize from '../models/index';


export function register(req, res) {
    let User = new userModel();
    User.save(req.body)
        .then(user => res.status(201).json(user));
}

export function users(req, res) {
    console.log(req.query);
    let User = new userModel();
    if (req.query.user_id) {
        User.findByUserID(req.query.user_id).then(user => res.json(user)).catch(error => res.send(error));
        return;
    } else if (req.query.user_name) {
        User.findByUsername(req.query.user_name).then(user => res.json(user)).catch(error => res.send(error));
        return;
    } else {
        User.loadAll().then(user => res.json(user)).catch(error => res.send(error));
        return;
    }
}

export function remove(req, res) {
    let id = req.params._id;
    let User = new userModel();
    User.removeUserByID(id).then(user => res.json(user));
}