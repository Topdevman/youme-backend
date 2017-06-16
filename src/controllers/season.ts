import { Router, Request, Response } from '@types/express';

import { Controller } from './controller';

import { Authenticator } from '../middleware/authenticator';

import db from '../models/index';

export class SeasonController extends Controller {

    constructor(parentRouter : Router) {
        
        super('/season', parentRouter);
    }

    @Controller.post('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])    
    private register(req : Request, res : Response) {       
        db.Season.create(req.body).then(season => res.status(201).send(season))
                    .catch(error => res.status(404).send(error));
    }

    @Controller.get('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])    
    private seasons(req : Request, res : Response) {
        
        
        if (req.query.name) {
            db.Season.findOne({where: {name: req.query.name}}).then(season => res.json(season)).catch(error => res.send(error));
            return;
        } else {
            db.Season.findAll({include:[{
                    model: db.Episode,
                    as: 'episodes',
                    include: [{
                        model: db.Moment,
                        as: 'moments',
                        include: [{
                            model: db.View,
                            as: 'views',
                        }]
                    },{
                        model: db.Track,
                        as: 'tracks',
                        include: [{
                            model: db.TrackView,
                            as: 'views'
                        }]
                    }]                   
                }]
            }).then((season : any) => {res.status(201).send(season)}).catch((error : any) => res.status(404).send("error"));
            return;
        }
    }

    @Controller.get('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private getSeasonById(req, res) {
        const seasonId = req.params._id;
        db.Season.findById(seasonId, {include: [{
            model: db.Episode,
            as: 'episodes',
            include: [{
                model: db.Moment,
                as: 'moments',
                include: [{
                    model: db.View,
                    as: 'views',
                }]
            },{
                model: db.Track,
                as: 'tracks',
                include: [{
                    model: db.TrackView,
                    as: 'views'
                }]
            }]
        }]
        }).then(season => res.status(201).send(season)).catch(error => res.status(404).send("Season not found"));
        return;        
    }

    @Controller.put('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private update(req, res) {
        const id = req.params._id;
        const query = req.body;
        db.Season.update(query,{where: {id: id}}).then(season => res.status(201).send(season)).catch(() => res.status(404).send("Season not found"));
    }

    @Controller.delete('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])    
    private remove(req, res) {
        
        let id = req.params._id;    
        db.Season.destroy({where: {id: id}}).then(season => res.json(season));
    }

    public static checkSeasonExist(req, res, next) {
        
        let id = req.body.seasonId;

        if (id) {
            db.Season.findById(id)
                .then((season) => {
                    req.totalEpisode = season.totalEpisode + 1;
                    res.status(201);
                    next();
                })
                .catch(error => res.status(401).send("Season ID not found"));
            return;
        } else {
            res.status(404).send("Season ID is not exist.");
        }
    }
}

declare module "express" {
    interface Request {
        totalEpisode? : number;
    }
}
