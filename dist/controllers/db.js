"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import packages
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
// Import configs
const configSetup_1 = __importDefault(require("../config/configSetup"));
let db = {};
const sequelize = new sequelize_1.Sequelize(configSetup_1.default.DBNAME, configSetup_1.default.DBUSERNAME, configSetup_1.default.DBPASSWORD, {
    host: configSetup_1.default.DBHOST,
    dialect: "mysql",
    port: configSetup_1.default.DBPORT,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
db.Op = sequelize_1.Op;
// load models
fs_1.default.readdirSync(__dirname + '/../models')
    .filter(function (file) {
    return file.indexOf('.') !== 0 && file !== 'index.js';
})
    .forEach(function (file) {
    return __awaiter(this, void 0, void 0, function* () {
        var model = sequelize.import(path_1.default.join(__dirname + '/../models', file));
        db[model.name] = model;
    });
});
Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});
//Sync Database
sequelize
    .sync()
    .then(function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('DB CONNECTED ');
    });
})
    .catch(function (err) {
    console.log(err, 'Something went wrong with the Database Update!');
});
// exports
db.Sequelize = sequelize_1.Sequelize;
db.sequelize = sequelize;
exports.default = db;
