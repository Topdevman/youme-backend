"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
let sequelize = new Sequelize('postgres://postgres:root@localhost:5432/youme');
exports.default = sequelize;
