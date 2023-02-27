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
exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("./db"));
const sequelize_1 = require("sequelize");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new Error('Fiald must have a valid input');
    }
    const { names, phone, email, password, gender } = req.body;
    //Hash password
    const salt = yield bcryptjs_1.default.genSalt(15);
    const hashPassword = yield bcryptjs_1.default.hash(password, salt);
    let insertData = { names, phone, email, password: hashPassword, gender };
    try {
        const userExists = yield db_1.default.users.findOne({
            where: { [sequelize_1.Op.or]: [{ email }, { phone }] },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });
        // if user exists, stop the process and return a message
        if (userExists)
            throw new Error(`user with email ${email}  or phone ${phone} already exists`);
        const user = yield db_1.default.users.create(insertData);
    }
    catch (error) {
        console.log(error);
        throw new Error(`An error occurred - ${error}`);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        errors.array();
        throw new Error('Validation Error');
    }
    const { email, password } = req.body;
    try {
        const user = yield db_1.default.users.findOne({
            where: { email },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: { model: db_1.default.userSettings, attributes: { exclude: ['createdAt', 'updatedAt'] } },
        });
        if (!user) {
            throw new Error(`Incorrect Credentials`);
        }
    }
    catch (error) {
        console.log(error);
        throw new Error(`An error occurred - ${error}`);
    }
});
exports.login = login;
