import { InviteDataType } from '../helpers/types';
import { fnResponse } from '../helpers/utility';
import DB from '../controllers/db';





export class Invite {
     
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

     const updateDoc: InviteDataType = { ...updateInvite, status: 'accepted' }; // add the new status field

     await DB.invites.update({ status: 'accepted' }, { where: { id } }); 
     return fnResponse({ status: true, message:`Invite Accepted!` ,data: updateDoc });
    
     } catch (error) {
          return fnResponse({ status: false, message: `An error occurred - ${error}` });
     } 
     
}

public async rejectInite({ id , data}: InviteDataType) {
    
     try {
                  
     const updateInvite = await DB.invites.finOne({
          where: {
               id

               
           }

     })

     if (!updateInvite) {
          return fnResponse({ status: false, message: `Invite not found!` });
     }

     const updateDoc: InviteDataType = { ...updateInvite, status: 'declined' }; // add the new status field

     await DB.invites.update({ status: 'declined' }, { where: { id } }); 
     return fnResponse({ status: true, message:`Invite Declined!` ,data: updateDoc });
     
    
     } catch (error) {
          return fnResponse({ status: false, message: `An error occurred - ${error}` });  
     }
}

public async deleteInviteByCreator (id: number) {
     try {
      const data = await DB.Invites.findOne({ where: {  id } });  
      if( !data) {
          return fnResponse({ status: false, message: `Document with id ${id} not found!` }); 
           
      } 
      await data.destroy({ force: true });
			return fnResponse({ status: true, message: `invite successfully deleted!` }); 
     } catch (error) {
          return fnResponse({ status: false, message: `An error occurred - ${error}` });  
     }
}
    
}

