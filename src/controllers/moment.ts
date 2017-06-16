import { Router, Request, Response } from '@types/express';

import { Controller } from './controller';
import { EpisodeController } from './episode';

import { Authenticator } from '../middleware/authenticator';

import db from '../models/index';


export class MomentController extends Controller {

    constructor(parentRouter : Router) {
        
        super('/moment', parentRouter);
    }
    
    @Controller.post('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid, EpisodeController.checkEpisodeExist])    
    private register(req : Request, res : Response) {
        db.Moment.create(req.body).then(moment => res.status(201).send(moment))
                    .catch(error => res.status(404).send(error));
        return;
    }

    @Controller.get('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])    
    private moments(req, res) {
    
        if (req.query.episodeId) {
            db.Moment.findOne({where: {episodeId: req.query.episodeId}}).then(moment => res.json(moment)).catch(error => res.send(error));
        } else if (req.query.name) {
            db.Moment.findOne({where: {name: req.query.name}}).then(moment => res.json(moment)).catch(error => res.send(error));
        } else {
            db.Moment.findAll({
                include: [{
                    model: db.View,
                    as: 'views',                
                }]
            }).then(moment => res.json(moment)).catch(error => res.send(error));
        }
    }

    @Controller.get('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private getMomentById(req, res) {       
        const id = req.params._id;
        db.Moment.findById(id, {
            include: [{
                model: db.View,
                as: 'views',                
            }]
        }).then(moment => res.status(201).send(moment)).catch(() => res.status(404).send("Moment not found"));        
    }

    @Controller.put('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private update(req, res) {
        const id = req.params._id;
        const query = req.body;        
        db.Moment.update(query, {where: {id: id}}).then(moment => res.status(201).send(moment)).catch(() => res.status(404).send("Moment not found"));
              
    }

    @Controller.delete('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])    
    private remove(req, res) {
        
        let id = req.params._id;    
        db.Moment.destroy({where: {id: id}}).then(moment => res.json(moment));

        return;   
    }

    public static checkMomentExist(req, res, next) {
        
        let id = req.body.momentId;
        if (id){
            db.Moment.findById(id)
                .then((moment) => {
                    req.totalView = moment.totalView + 1;
                    req.episodeId = moment.episodeId;
                    res.status(201);
                    next();
                })
                .catch(error => res.send(error));
        } else {
            res.status(400).send("Moment is not exist");
        }

        return;
    }
}

declare module "express" {
    interface Request {
        totalView?: number;
        episodeId?: string;
    }
}