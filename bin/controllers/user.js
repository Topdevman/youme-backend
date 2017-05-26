"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const authenticator_1 = require("../middleware/authenticator");
const user_1 = require("../models/user");
class UserController extends controller_1.Controller {
    constructor(parentRouter) {
        super('/user', parentRouter);
    }
    register(req, res) {
        user_1.User.save(req.body)
            .then(user => res.status(201).json(user));
    }
    users(req, res) {
        if (req.query.user_id) {
            user_1.User.findByUserID(req.query.user_id).then((user) => res.json(user)).catch((error) => res.send(error));
            return;
        }
        else if (req.query.name) {
            user_1.User.findByUserName(req.query.name).then((user) => res.json(user)).catch((error) => res.send(error));
            return;
        }
        else {
            user_1.User.loadAll().then((user) => res.json(user)).catch((error) => res.send(error));
            return;
        }
    }
    remove(req, res) {
        let id = req.params._id;
        user_1.User.removeUserByID(id).then((user) => res.json(user));
    }
    static checkUserExist(req, res, next) {
        let id = req.body.season_id;
        user_1.User.findByUserID(id)
            .then((user) => {
            res.status(201);
            next();
        })
            .catch((error) => res.send(error));
        return;
    }
}
__decorate([
    controller_1.Controller.post('/register')
], UserController.prototype, "register", null);
__decorate([
    controller_1.Controller.get('/', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid])
], UserController.prototype, "users", null);
__decorate([
    controller_1.Controller.delete('/', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid])
], UserController.prototype, "remove", null);
exports.UserController = UserController;
