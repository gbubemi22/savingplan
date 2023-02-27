import { Router, Response, Request } from 'express';


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
	return res.status(200).send('API Working');
});


routes.post('/register',register)
routes.post('/login',login)

routes.post('/invite',Invite.createInvite)
routes.patch('/invite',Invite.acceptInvite)


routes.post('/plan',createPlan)



export default routes;