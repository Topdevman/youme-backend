"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const passport = require("passport");
const expressJwt = require("express-jwt");
const passwordHash = require("password-hash");
const user_1 = require("../models/user");
const auth_1 = require("../models/auth");
const LocalStrategy = require('passport-local').Strategy;
let User = new user_1.default();
let AuthToken = new auth_1.default(User);
const AUTH_HEADER_PREFIX = 'Bearer ';
function generateToken(req, res, next) {
    req.token = jwt.sign({
        id: req.user.id,
    }, 'server secret', {
        expiresIn: '7d'
    });
    AuthToken.save(req.user.id, req.token).then(() => next()).catch(next);
}
exports.generateToken = generateToken;
;
function sendAuthToken(req, res) {
    res.json({ token: req.token });
}
exports.sendAuthToken = sendAuthToken;
;
exports.checkAuthToken = expressJwt({ secret: 'server secret' });
function extractAuthToken(req) {
    let authHeader = req.get('Authorization');
    if (authHeader) {
        authHeader = authHeader.startsWith(AUTH_HEADER_PREFIX) ? authHeader.substr(AUTH_HEADER_PREFIX.length - 1)
            : authHeader;
        authHeader = authHeader.trim();
    }
    return authHeader;
}
function sendInvalidAuthTokenError(res) {
    res.status(401).send('Invalid access token');
}
function checkAuthTokenValid(req, res, next) {
    if (req.user) {
        let authtoken = extractAuthToken(req);
        if (authtoken) {
            AuthToken.findByUserID(req.user.id).then(validToken => !validToken || authtoken !== validToken.token ? sendInvalidAuthTokenError(res) : next()).catch(next);
        }
        else {
            sendInvalidAuthTokenError(res);
        }
    }
    else {
        next();
    }
}
exports.checkAuthTokenValid = checkAuthTokenValid;
;
function serialize(req, res, next) {
    req.user = {
        id: req.user.id
    };
    next();
}
exports.serialize = serialize;
;
exports.authenticate = passport.authenticate('local', { session: false });
exports.localStrategy = new LocalStrategy({ nameField: 'username', passwordField: 'password' }, (username, password, done) => {
    console.log("Name: " + username);
    User.findByUserName(username).then((user) => {
        console.log(user.password);
        user && passwordHash.verify(password, user.password) ? done(null, user) : done(null, false);
    }).catch(done);
});
function logout(req, res, next) {
    AuthToken.clearUserSession(req.user.id).then(() => {
        req.logout();
        res.send();
    }).catch(next);
}
exports.logout = logout;
