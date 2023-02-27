// Import packages
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


// Import db & configs
import config from '../config/configSetup';
import DB from './db';
import { Op } from 'sequelize';
import { RegisterDataType } from '../helpers/types';



export const register = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		throw new Error ('Fiald must have a valid input');
	}

	const { names, phone, email, password , gender} = req.body;

	//Hash password
	const salt: string = await bcrypt.genSalt(15);
	const hashPassword: string = await bcrypt.hash(password, salt);

	let insertData: RegisterDataType = { names, phone, email, password: hashPassword , gender};

	try {
		const userExists: any = await DB.users.findOne({
			where: { [Op.or]: [{ email }, { phone }] },
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		});

		// if user exists, stop the process and return a message
		if (userExists)  throw new Error(  `user with email ${email}  or phone ${phone} already exists`);

		const user: any = await DB.users.create(insertData);

		
		
	} catch (error) {
		console.log(error);
		throw new Error(`An error occurred - ${error}`);
	}
};



export const login = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
          errors.array()
		throw new Error( 'Validation Error');
	}

	const { email, password } = req.body;

	try {
		const user = await DB.users.findOne({
			where: { email },
			attributes: { exclude: ['createdAt', 'updatedAt'] },
			include: { model: DB.userSettings, attributes: { exclude: ['createdAt', 'updatedAt'] } },
		});

		if (!user) {
			
			throw new Error (`Incorrect Credentials`);
		}
	} catch (error) {
		console.log(error);
		throw new Error( `An error occurred - ${error}`);
	}
};