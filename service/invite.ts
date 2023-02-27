import { InviteDataType } from '../helpers/types';
import { fnResponse } from '../helpers/utility';
import DB from '../controllers/db';
import plan from '../controllers/plan';



export class Invite {
     static id: any;
     public async sendInvite({ data, userId, planId }:InviteDataType ) {
          try {
               const invite = await DB.invites.create({
                    data,
                    userId,
                    planId,
               });
               return fnResponse({ status: true, message: `Invite created!`, data: invite}); 
               
          } catch (error) {
             // console.log(error);
			return fnResponse({ status: false, message: `An error occurred - ${error}` });   
          }
     }

    public async acceptInite({ id, data }: InviteDataType) {

     try {
           
     const updateInvite = await DB.invites.finOne({
          where: {
               id

               
           }

     })

     if (!updateInvite) {
          return fnResponse({ status: false, message: `Invite not found!` });
     }

     const updateDoc: InviteDataType = { data} ;
     await DB.invites.update(updateInvite)
     return fnResponse({ status: true, message:`Invite Accepted!` });
    
     } catch (error) {
          return fnResponse({ status: false, message: `An error occurred - ${error}` });
     } 
     
}
    
}