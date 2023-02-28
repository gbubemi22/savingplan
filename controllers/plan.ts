// Import packages
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { Plan } from  '../service/plan';

import DB from './db'

import { handleResponse, successResponse, errorResponse,  } from '../helpers/utility';
import {  FnResponseDataType, PlanDataType } from '../helpers/types';



const createPlan = async (req: Request, res: Response) => {
     const errors = validationResult(req);
     if(!errors.isEmpty()){
          return errorResponse(res, 'Validation Error', errors.array());
     }

     const data = req.body

     const plan = new Plan();
     const insertData: PlanDataType = {
           userId: req.user.id,
           title: data.title,
           people_to_save_with: data.people_to_save_with,
           target: data.target,
           auto_save: data.auto_save,
           saving_frequency: data.saving_frequency,
           start: data.start,
           amount_to_save: data.amount_to_save,
           when_to_start_saving: data.when_to_start_saving,
           period_of_saving: data.period_of_saving,
           start_date: data.start_date,
           end_date: data.end_date,
           relation_type: data.relation_type,
     };

    try {
     const { status, message, data }: FnResponseDataType = 
     await plan.create(insertData);
     if(!status) {
          return errorResponse(res, message, data);
     }
     if(data.people_to_save_with > 5)
     throw new Error('can not add more than 5 people')
    } catch (error) {
     console.error(error);
     return errorResponse(res, 'Error', error);
    }

   
}


export default createPlan;