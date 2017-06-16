"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const index_1 = require("../models/index");
class Authenticator {
    static generateToken(req, res, next) {
        req.token = jwt.sign({
            id: req.body.userID
        }, 'server secret', {
            expiresIn: '7d'
        });
        index_1.default.AuthToken.create({ token: req.token, userId: req.body.userID }).then(() => {
            req.userID = req.body.userID;
            next();
        }).catch(() => next());
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
        if (req.userID) {
            let authtoken = Authenticator.extractAuthToken(req);
            if (authtoken) {
                index_1.default.AuthToken.findOne({ where: { userId: req.userID } }).then((validToken) => !validToken || authtoken !== validToken.token ? this.sendInvalidAuthTokenError(res) : next()).catch(() => next());
            }
            else {
                Authenticator.sendInvalidAuthTokenError(res);
            }
        }
        else {
            next();
        }
    }
    static logout(req, res, next) {
        index_1.default.AuthToken.destroy({ where: { userId: req.userID } }).then(() => {
            req.connection.destroy();
            res.send();
        }).catch(() => next());
    }
}
Authenticator.AUTH_HEADER_PREFIX = 'Bearer ';
Authenticator.checkAuthToken = expressJwt({ secret: 'server secret' });
exports.Authenticator = Authenticator;
//# sourceMappingURL=authenticator.js.map