import userModel from '../models/user';
import * as sequelize from '../models/index';

let User = new userModel();

export function register(req, res) {
    
    User.save(req.body)
        .then(user => res.status(201).json(user));
}

export function users(req, res) {
        
    if (req.query.user_id) {
        User.findByUserID(req.query.user_id).then(user => res.json(user)).catch(error => res.send(error));
        return;
    } else if (req.query.name) {
        User.findByUsername(req.query.name).then(user => res.json(user)).catch(error => res.send(error));
        return;
    } else {
        User.loadAll().then(user => res.json(user)).catch(error => res.send(error));
        return;
    }
}

export function remove(req, res) {
    
    let id = req.params._id;    
    User.removeUserByID(id).then(user => res.json(user));
}