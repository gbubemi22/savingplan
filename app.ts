
import bodyParser from 'body-parser';



import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config/configSetup'




//const app = express();
const app: Application = express();


app.use(morgan('dev'));



app.use(cors({ origin: true }));
app.listen(config.PORT, () => {
	console.log(`Server started on port ${config.PORT}`);
});