import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import * as expressJwt from 'express-jwt';
import * as passwordHash from 'password-hash';
import userModel from '../models/user';
import authTokenModel from '../models/auth';


const LocalStrategy = require('passport-local').Strategy;

let User = new userModel();
let AuthToken = new authTokenModel(User);

const AUTH_HEADER_PREFIX = 'Bearer ';

export function generateToken(req, res, next) {
  req.token = jwt.sign({
    id: req.user.id,
  }, 'server secret', {
    expiresIn: '7d'
  });
  AuthToken.save(req.user.id, req.token).then(() => next()).catch(next);
};

export function sendAuthToken(req, res) {
  res.json({token: req.token});
};

export let checkAuthToken = expressJwt({secret: 'server secret'});

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

export function checkAuthTokenValid(req, res, next) {
  if (req.user) {
    let authtoken = extractAuthToken(req);
    if (authtoken) {
      AuthToken.findByUserID(req.user.id).then(validToken =>
        !validToken || authtoken !== validToken.token ? sendInvalidAuthTokenError(res) : next()).catch(next);
    } else {
      sendInvalidAuthTokenError(res);
    }
  } else {
    next();
  }
};

export function serialize(req, res, next) {
  req.user = {
    id: req.user.id
  };
  next();
};

export let authenticate = passport.authenticate('local', {session: false});

export let localStrategy = new LocalStrategy({nameField: 'username', passwordField: 'password'},
  (username, password, done) => {
    console.log("Name: " + username);
    User.findByUserName(username).then((user) => {
    console.log(user.password);
    user && passwordHash.verify(password, user.password) ? done(null, user) : done(null, false);
  }).catch(done);
});

export function logout(req, res, next) {
  AuthToken.clearUserSession(req.user.id).then(() => {
    req.logout();
    res.send();
  }).catch(next);
}