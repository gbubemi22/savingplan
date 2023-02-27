export {};

declare global {
	namespace Express {
		export interface Request {
			user?: any;
			admin?: any;
			query?: any;
		}
	}
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: string;
			PORT: string;
			SSL: string;
			JWTSECRET: string;
			JWT_EXPIRY_TIME: string;
			DBNAME: string;
			DBUSERNAME: string;
			DBPASSWORD: string;
			DBHOST: string;
			DBPORT: string;
			DBDIALECT: string;
			
          }   
	}
}
