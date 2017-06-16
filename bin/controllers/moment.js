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
const episode_1 = require("./episode");
const authenticator_1 = require("../middleware/authenticator");
const index_1 = require("../models/index");
class MomentController extends controller_1.Controller {
    constructor(parentRouter) {
        super('/moment', parentRouter);
    }
    register(req, res) {
        index_1.default.Moment.create(req.body).then(moment => res.status(201).send(moment))
            .catch(error => res.status(404).send(error));
        return;
    }
    moments(req, res) {
        if (req.query.episodeId) {
            index_1.default.Moment.findOne({ where: { episodeId: req.query.episodeId } }).then(moment => res.json(moment)).catch(error => res.send(error));
        }
        else if (req.query.name) {
            index_1.default.Moment.findOne({ where: { name: req.query.name } }).then(moment => res.json(moment)).catch(error => res.send(error));
        }
        else {
            index_1.default.Moment.findAll({
                include: [{
                        model: index_1.default.View,
                        as: 'views',
                    }]
            }).then(moment => res.json(moment)).catch(error => res.send(error));
        }
    }
    getMomentById(req, res) {
        const id = req.params._id;
        index_1.default.Moment.findById(id, {
            include: [{
                    model: index_1.default.View,
                    as: 'views',
                }]
        }).then(moment => res.status(201).send(moment)).catch(() => res.status(404).send("Moment not found"));
    }
    update(req, res) {
        const id = req.params._id;
        const query = req.body;
        index_1.default.Moment.update(query, { where: { id: id } }).then(moment => res.status(201).send(moment)).catch(() => res.status(404).send("Moment not found"));
    }
    remove(req, res) {
        let id = req.params._id;
        index_1.default.Moment.destroy({ where: { id: id } }).then(moment => res.json(moment));
        return;
    }
    static checkMomentExist(req, res, next) {
        let id = req.body.momentId;
        if (id) {
            index_1.default.Moment.findById(id)
                .then((moment) => {
                req.totalView = moment.totalView + 1;
                req.episodeId = moment.episodeId;
                res.status(201);
                next();
            })
                .catch(error => res.send(error));
        }
        else {
            res.status(400).send("Moment is not exist");
        }
        return;
    }
}
__decorate([
    controller_1.Controller.post('/', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid, episode_1.EpisodeController.checkEpisodeExist]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MomentController.prototype, "register", null);
__decorate([
    controller_1.Controller.get('/', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MomentController.prototype, "moments", null);
__decorate([
    controller_1.Controller.get('/:_id', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MomentController.prototype, "getMomentById", null);
__decorate([
    controller_1.Controller.put('/:_id', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MomentController.prototype, "update", null);
__decorate([
    controller_1.Controller.delete('/:_id', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MomentController.prototype, "remove", null);
exports.MomentController = MomentController;
//# sourceMappingURL=moment.js.map