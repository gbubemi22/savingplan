import { Router, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import{ register, login} from '../controllers/auth';
//import  Plan  from '../controllers/plan';
import Invite from '../controllers/invite';
import createPlan from '../controllers/plan';


const routes = Router();

/*************************************************************************
API CALL START
*************************************************************************/

// INDEX ROUTE TO SHOW API IS WORKING FINE
routes.get('/', (req, res) => {
	return res.status(StatusCodes.OK).send('API Working');
});

// Create and login
routes.post('/register',register)
routes.post('/login',login)

// Invite
routes.post('/invite',Invite.createInvite)
routes.post('/invite/accept/:id',Invite.acceptInvite)
routes.post('/invite/reject/:id',Invite.rejectInvite)
routes.delete('/invite/:id',Invite.deleteInvite)


routes.post('/plan',createPlan)



export default routes;