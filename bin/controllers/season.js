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
const authenticator_1 = require("../middleware/authenticator");
const index_1 = require("../models/index");
class SeasonController extends controller_1.Controller {
    constructor(parentRouter) {
        super('/season', parentRouter);
    }
    register(req, res) {
        index_1.default.Season.create(req.body).then(season => res.status(201).send(season))
            .catch(error => res.status(404).send(error));
    }
    seasons(req, res) {
        if (req.query.name) {
            index_1.default.Season.findOne({ where: { name: req.query.name } }).then(season => res.json(season)).catch(error => res.send(error));
            return;
        }
        else {
            index_1.default.Season.findAll({ include: [{
                        model: index_1.default.Episode,
                        as: 'episodes',
                        include: [{
                                model: index_1.default.Moment,
                                as: 'moments',
                                include: [{
                                        model: index_1.default.View,
                                        as: 'views',
                                    }]
                            }, {
                                model: index_1.default.Track,
                                as: 'tracks',
                                include: [{
                                        model: index_1.default.TrackView,
                                        as: 'views'
                                    }]
                            }]
                    }]
            }).then((season) => { res.status(201).send(season); }).catch((error) => res.status(404).send("error"));
            return;
        }
    }
    getSeasonById(req, res) {
        const seasonId = req.params._id;
        index_1.default.Season.findById(seasonId, { include: [{
                    model: index_1.default.Episode,
                    as: 'episodes',
                    include: [{
                            model: index_1.default.Moment,
                            as: 'moments',
                            include: [{
                                    model: index_1.default.View,
                                    as: 'views',
                                }]
                        }, {
                            model: index_1.default.Track,
                            as: 'tracks',
                            include: [{
                                    model: index_1.default.TrackView,
                                    as: 'views'
                                }]
                        }]
                }]
        }).then(season => res.status(201).send(season)).catch(error => res.status(404).send("Season not found"));
        return;
    }
    update(req, res) {
        const id = req.params._id;
        const query = req.body;
        index_1.default.Season.update(query, { where: { id: id } }).then(season => res.status(201).send(season)).catch(() => res.status(404).send("Season not found"));
    }
    remove(req, res) {
        let id = req.params._id;
        index_1.default.Season.destroy({ where: { id: id } }).then(season => res.json(season));
    }
    static checkSeasonExist(req, res, next) {
        let id = req.body.seasonId;
        if (id) {
            index_1.default.Season.findById(id)
                .then((season) => {
                req.totalEpisode = season.totalEpisode + 1;
                res.status(201);
                next();
            })
                .catch(error => res.status(401).send("Season ID not found"));
            return;
        }
        else {
            res.status(404).send("Season ID is not exist.");
        }
    }
}
__decorate([
    controller_1.Controller.post('/', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SeasonController.prototype, "register", null);
__decorate([
    controller_1.Controller.get('/', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SeasonController.prototype, "seasons", null);
__decorate([
    controller_1.Controller.get('/:_id', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SeasonController.prototype, "getSeasonById", null);
__decorate([
    controller_1.Controller.put('/:_id', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SeasonController.prototype, "update", null);
__decorate([
    controller_1.Controller.delete('/:_id', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SeasonController.prototype, "remove", null);
exports.SeasonController = SeasonController;
//# sourceMappingURL=season.js.map