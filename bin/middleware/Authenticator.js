"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const passwordHash = require("password-hash");
const user_1 = require("../models/user");
const auth_1 = require("../models/auth");
class Authenticator {
    static authenticate(req, res, next) {
        let username = req.body.username;
        let password = req.body.password;
        user_1.User.findByUserName(username).then((user) => {
            req.user = user && passwordHash.verify(password, user.password) ? user : null;
            next();
        });
    }
    static generateToken(req, res, next) {
        req.token = jwt.sign({
            id: req.user.id
        }, 'server secret', {
            expiresIn: '7d'
        });
        auth_1.AuthToken.save(req.user.id, req.token).then(() => next()).catch(next);
    }
    static sendAuthToken(req, res) {
        res.json({ token: req.token });
    }
    static extractAuthToken(req) {
        let authHeader = req.get('Authorization');
        if (authHeader) {
            authHeader = authHeader.startsWith(this.AUTH_HEADER_PREFIX) ? authHeader.substr(this.AUTH_HEADER_PREFIX.length - 1)
                : authHeader;
            authHeader = authHeader.trim();
        }
        return authHeader;
    }
    static sendInvalidAuthTokenError(res) {
        res.status(401).send('Invalid access token');
    }
    static checkAuthTokenValid(req, res, next) {
        if (req.user) {
            let authtoken = Authenticator.extractAuthToken(req);
            if (authtoken) {
                auth_1.AuthToken.findByUserID(req.user.id).then((validToken) => !validToken || authtoken !== validToken.token ? this.sendInvalidAuthTokenError(res) : next()).catch(next);
            }
            else {
                Authenticator.sendInvalidAuthTokenError(res);
            }
        }
        else {
            next();
        }
    }
    static serialize(req, res, next) {
        req.user = {
            id: req.user.id
        };
        next();
    }
    static logout(req, res, next) {
        auth_1.AuthToken.clearUserSession(req.user.id).then(() => {
            req.logout();
            res.send();
        }).catch(next);
    }
}
Authenticator.AUTH_HEADER_PREFIX = 'Bearer ';
Authenticator.checkAuthToken = expressJwt({ secret: 'server secret' });
exports.Authenticator = Authenticator;
