import { Router, Request, Response } from '@types/express';

import { Controller } from './controller';
import { SeasonController } from './season';

import { Authenticator } from '../middleware/authenticator';

import db from '../models/index';


export class EpisodeController extends Controller {

    constructor(parentRouter : Router) {
        
        super('/episode', parentRouter);
    }
    
    @Controller.post('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid, SeasonController.checkSeasonExist])    
    private register(req : Request, res : Response) {
        db.Episode.create(req.body).then((episode) => {
            db.Season.update({totalEpisode: req.totalEpisode}, {where: {id: req.body.seasonId}}).then((episode) => res.status(201).send(episode)).catch((error) => res.status(400));
        }).catch(() => res.status(400).send("Bad request"));
        return;
    }

    @Controller.get('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])    
    private episodes(req, res) {
    
        if (req.query.seasonId) {
            db.Episode.findOne({where: {seasonId: req.query.seasonId}}).then(episode => res.json(episode)).catch(error => res.send(error));
        } else if (req.query.name) {
            db.Episode.findOne({where: {name: req.query.name}}).then(episode => res.json(episode)).catch(error => res.send(error));
        } else {
            db.Episode.findAll({
                include: [{
                    model: db.Moment,
                    as: 'moments',
                    include: [{
                        model: db.View,
                        as: 'views'
                    }]                
                }, {
                    model: db.Track,
                    as: 'tracks',
                    include: [{
                        model: db.TrackView,
                        as: 'views'
                    }]
                }]
            }).then(episode => res.json(episode)).catch(error => res.send(error));
        }
        return;
    }

    @Controller.get('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private getEpisodeByID(req, res, next) {
        console.log(req.params._id);
        const id = req.params._id;
        db.Episode.findById(id, {
            include: [{
                model: db.Moment,
                as: 'moments',
                include: [{
                    model: db.View,
                    as: 'views'
                }]                
            }, {
                model: db.Track,
                as: 'tracks',
                include: [{
                    model: db.TrackView,
                    as: 'views'
                }]
            }]
        }).then(episode => res.status(201).send(episode)).catch(() => res.status(404).send("Episode not found"));
    }

    @Controller.put('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private update(req, res) {
        const id = req.params._id;
        const query = req.body;
        db.Episode.update(query, {where: {id: id}}).then(episode => res.status(201).send(episode)).catch(() => res.status(404).send("Episode not found"));
    }

    @Controller.delete('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])    
    private remove(req, res) {
        
        let id = req.params._id;
            db.Episode.destroy({where: {id: id}}).then((episode) => {
                db.Season.findById(id).then(season => {
                    let totalEpisode = season.totalEpisode - 1;
                    db.Season.update({
                        totalEpisode: totalEpisode
                    }, {
                        where: {id: id}
                    }).then(() => res.status(201).send(episode))
                    .catch(() => res.status(400).send("Bad Request"));
                })
                .catch(() => res.status(404).send("Bad Request"));
            })
            .catch(() => res.status(404).send("Bad Request"));

            return;   
    }

    public static checkEpisodeExist(req, res, next) {
        
        let id = req.body.episodeId;
        if (id){
            db.Episode.findById(id)
                .then((episode) => {
                    res.status(201);
                    next();
                })
                .catch(error => res.send(error));
            return;
        } else {
            res.status(400).send("Episode ID is not exist");
        }
    }
}