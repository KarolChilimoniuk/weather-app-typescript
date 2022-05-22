import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import router from './routes';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const app:Express = express();
const port = process.env.PORT || 4000;

app.get('/', (req: Request, res: Response) =>{
    res.send('Welcome in my Express + Typescript server!');
})
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/weather', router);

app.listen(port, () => {
    console.log(`Server works on port ${port}`);
});