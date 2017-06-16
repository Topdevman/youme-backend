import { Router, Request, Response } from '@types/express';

import { Controller } from './controller';
import { MomentController } from './moment';

import { Authenticator } from '../middleware/authenticator';

import db from '../models/index';


export class ViewController extends Controller {

    constructor(parentRouter : Router) {
        
        super('/view', parentRouter);
    }
    
    @Controller.post('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid, MomentController.checkMomentExist])    
    private register(req : Request, res : Response) {
        db.View.create(req.body).then((view) => {
            db.Moment.update({episodeId: req.episodeId, totalView: req.totalView},{where: {id: view.momentId}}).then(() => res.status(201).send(view)).catch((error) => res.status(400));
        }).catch(() => res.status(400).send("Bad request"));
        return;
    }

    @Controller.get('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])    
    private views(req, res) {
    
        if (req.query.momentId) {
            db.View.findOne({where: {momentId: req.query.momentId}}).then(view => res.json(view)).catch(error => res.send(error));
        } else if (req.query.name) {
            db.View.findOne({where: {name: req.query.name}}).then(view => res.json(view)).catch(error => res.send(error));
        } else {
            db.View.findAll().then(view => res.json(view)).catch(error => res.send(error));
        }
        return;
    }

    @Controller.get('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private getViewById(req, res, next) {
        const id = req.params._id;
        db.View.findById(id).then(view => res.json(view)).catch(error => res.send(error));
    }

    @Controller.put('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private update(req, res) {
        const id = req.params._id;
        const query = req.body;        
        db.View.update(query, {where: {id: id}}).then(view => res.status(201).send(view)).catch(() => res.status(404).send("View not found"));
            
    }   

    @Controller.delete('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])    
    private remove(req, res) {
        
        let id = req.params._id;
            db.View.destroy({where: {id: id}}).then((view) => {
                db.Moment.findById(id).then(moment => {
                    let totalView = moment.totalView - 1;
                    db.Moment.update({
                        episodeId: req.episode_id,
                        totalView: totalView
                    }, {
                        where: {id: id}
                    }).then(() => res.status(201).send(view))
                    .catch(() => res.status(400).send("Bad Request"));
                })
                .catch(() => res.status(404).send("Bad Request"));
            })
            .catch(() => res.status(404).send("Bad Request"));

            return;   
    }
}