"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CONTROLLERS = new Map();
class Controller {
    constructor(rootRoute, router) {
        this.rootRoute = rootRoute;
        this.router = express_1.Router();
        router.use(rootRoute, this.router);
        let cont = CONTROLLERS.get(this.constructor);
        if (cont) {
            for (let route of cont.routes) {
                let callback = (req, res) => {
                    this[route.functionName](req, res);
                };
                this.router[route.method](route.path, ...[...route.middleware, callback]);
            }
        }
    }
    static route(method, path, middleware) {
        return (object, functionName) => {
            let constructor = object.constructor;
            let cont = CONTROLLERS.get(constructor) || {
                objectConstructor: constructor,
                routes: new Array()
            };
            cont.routes.push({
                path,
                functionName,
                method,
                middleware
            });
            CONTROLLERS.set(constructor, cont);
        };
    }
    static get(path, middleware = []) {
        return this.route("get", path, middleware);
    }
    static post(path, middleware = []) {
        return this.route("post", path, middleware);
    }
    static put(path, middleware = []) {
        return this.route("put", path, middleware);
    }
    static delete(path, middleware = []) {
        return this.route("delete", path, middleware);
    }
}
exports.Controller = Controller;
