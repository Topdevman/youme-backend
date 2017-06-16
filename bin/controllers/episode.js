"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const season_1 = require("./season");
const authenticator_1 = require("../middleware/authenticator");
const index_1 = require("../models/index");
class EpisodeController extends controller_1.Controller {
    constructor(parentRouter) {
        super('/episode', parentRouter);
    }
    register(req, res) {
        index_1.default.Episode.create(req.body).then((episode) => {
            index_1.default.Season.update({ totalEpisode: req.totalEpisode }, { where: { id: req.body.seasonId } }).then((episode) => res.status(201).send(episode)).catch((error) => res.status(400));
        }).catch(() => res.status(400).send("Bad request"));
        return;
    }
    episodes(req, res) {
        if (req.query.seasonId) {
            index_1.default.Episode.findOne({ where: { seasonId: req.query.seasonId } }).then(episode => res.json(episode)).catch(error => res.send(error));
        }
        else if (req.query.name) {
            index_1.default.Episode.findOne({ where: { name: req.query.name } }).then(episode => res.json(episode)).catch(error => res.send(error));
        }
        else {
            index_1.default.Episode.findAll({
                include: [{
                        model: index_1.default.Moment,
                        as: 'moments',
                        include: [{
                                model: index_1.default.View,
                                as: 'views'
                            }]
                    }, {
                        model: index_1.default.Track,
                        as: 'tracks',
                        include: [{
                                model: index_1.default.TrackView,
                                as: 'views'
                            }]
                    }]
            }).then(episode => res.json(episode)).catch(error => res.send(error));
        }
        return;
    }
    getEpisodeByID(req, res, next) {
        console.log(req.params._id);
        const id = req.params._id;
        index_1.default.Episode.findById(id, {
            include: [{
                    model: index_1.default.Moment,
                    as: 'moments',
                    include: [{
                            model: index_1.default.View,
                            as: 'views'
                        }]
                }, {
                    model: index_1.default.Track,
                    as: 'tracks',
                    include: [{
                            model: index_1.default.TrackView,
                            as: 'views'
                        }]
                }]
        }).then(episode => res.status(201).send(episode)).catch(() => res.status(404).send("Episode not found"));
    }
    update(req, res) {
        const id = req.params._id;
        const query = req.body;
        index_1.default.Episode.update(query, { where: { id: id } }).then(episode => res.status(201).send(episode)).catch(() => res.status(404).send("Episode not found"));
    }
    remove(req, res) {
        let id = req.params._id;
        index_1.default.Episode.destroy({ where: { id: id } }).then((episode) => {
            index_1.default.Season.findById(id).then(season => {
                let totalEpisode = season.totalEpisode - 1;
                index_1.default.Season.update({
                    totalEpisode: totalEpisode
                }, {
                    where: { id: id }
                }).then(() => res.status(201).send(episode))
                    .catch(() => res.status(400).send("Bad Request"));
            })
                .catch(() => res.status(404).send("Bad Request"));
        })
            .catch(() => res.status(404).send("Bad Request"));
        return;
    }
    static checkEpisodeExist(req, res, next) {
        let id = req.body.episodeId;
        if (id) {
            index_1.default.Episode.findById(id)
                .then((episode) => {
                res.status(201);
                next();
            })
                .catch(error => res.send(error));
            return;
        }
        else {
            res.status(400).send("Episode ID is not exist");
        }
    }
}
__decorate([
    controller_1.Controller.post('/', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid, season_1.SeasonController.checkSeasonExist]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EpisodeController.prototype, "register", null);
__decorate([
    controller_1.Controller.get('/', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EpisodeController.prototype, "episodes", null);
__decorate([
    controller_1.Controller.get('/:_id', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], EpisodeController.prototype, "getEpisodeByID", null);
__decorate([
    controller_1.Controller.put('/:_id', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EpisodeController.prototype, "update", null);
__decorate([
    controller_1.Controller.delete('/:_id', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EpisodeController.prototype, "remove", null);
exports.EpisodeController = EpisodeController;
//# sourceMappingURL=episode.js.map