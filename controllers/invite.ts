// Import packages
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';


import { Invite } from '../service/invite';
import { handleResponse, successResponse, errorResponse,  } from '../helpers/utility';
import {  FnResponseDataType, InviteDataType, PlanDataType } from '../helpers/types';


const createInvite = async (req: Request, res: Response) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return errorResponse(res, 'Validation failed', errors.array());
     }

     const { data, planId } = req.body;
     const invite = new Invite();

     const insertData: InviteDataType = {
          data,
          planId,
          userId: req.user.id,
                 
     };

     try {
          const { status, message, data }: FnResponseDataType = 
          await invite.sendInvite(insertData);
		if (!status) return errorResponse(res, message);
		return successResponse(res, message, data);  
     } catch (error) {
          console.log(error);
		return errorResponse(res, `An error occurred - ${error}`);  
     }


}

const acceptInvite = async (req: Request, res: Response) => {
     const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return errorResponse(res, 'Validation Error', errors.array());
	}
     const { id } = req.params;
	const { data } = req.body;
     const invite = new Invite();
     
     try {
          const { status, message }: FnResponseDataType = await invite.acceptInite({ id: Number(id), data });
     if (!status) return errorResponse(res, message);
     return successResponse(res, message);
     } catch (error) {
          console.log(error);
          return errorResponse(res, `An error occurred - ${error}`); 
     }
}


export default {
     createInvite,
     acceptInvite,
}






