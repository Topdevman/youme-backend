import { Router, Request, Response } from '@types/express';

import { Controller } from './controller';
import { Authenticator } from '../middleware/authenticator';
import { Moment } from '../models/moment';


export class MomentController extends Controller {

    constructor(parentRouter : Router) {
        
        super('/moment', parentRouter);
    }

    private register(req, res) {
    
        const epsode_id = req.body.episode_id;
        const name = req.body.name;
        Moment.save(epsode_id, name)
            .then(moment => res.status(201).json(moment))
            .catch(error => res.status(400));
        return;
    }

    private moments(req, res) {
    
        if (req.query.episode_id) {
            Moment.findByEpisodeID(req.query.episode_id).then(moment => res.json(moment)).catch(error => res.send(error));
        } else if (req.query.moment_id) {
            Moment.findByMomentID(req.query.moment_id).then(moment => res.json(moment)).catch(error => res.send(error));
        } else if (req.query.name) {
            Moment.findByMomentName(req.query.name).then(moment => res.json(moment)).catch(error => res.send(error));
        } else {
            Moment.loadAll().then(moment => res.json(moment)).catch(error => res.send(error));
        }
    }

    private remove(req, res) {
        
        let id = req.params._id;    
        Moment.removeMomentByID(id).then(moment => res.json(moment));
    }

    private checkMomentExist(req, res, next) {
        let id = req.body.moment_id;
        
        Moment.findByMomentID(id)
            .then((moment) => {
                res.status(201);
                next();
            })
            .catch(error => res.send(error));
        return;
    }
}