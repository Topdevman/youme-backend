"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("./Controller");
const episode_1 = require("./episode");
const moment_1 = require("./moment");
const season_1 = require("./season");
const track_1 = require("./track");
const view_1 = require("./view");
const auth_1 = require("./auth");
const trackview_1 = require("./trackview");
class APIController extends Controller_1.Controller {
    constructor(app) {
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Accept, Authorization');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        });
        super("/", app);
        // let userController = new UserController(this.router);
        let authController = new auth_1.AuthController(this.router);
        let seasonController = new season_1.SeasonController(this.router);
        let episodeController = new episode_1.EpisodeController(this.router);
        let momentController = new moment_1.MomentController(this.router);
        let trackController = new track_1.TrackController(this.router);
        let viewController = new view_1.ViewController(this.router);
        let trackViewController = new trackview_1.TrackViewController(this.router);
    }
}
exports.APIController = APIController;
//# sourceMappingURL=api.js.map