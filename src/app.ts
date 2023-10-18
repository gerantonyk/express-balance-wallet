import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { getTokensWithPrice } from './controllers/getTokensWithPrice';
import cors from 'cors';
import { getCurrencies } from './controllers/getCurrencies';
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.get('/health', (req: Request, res: Response) => {
  res.send('server is up and running');
});

app.get('/tokens', getTokensWithPrice);

app.get('/currencies', getCurrencies);

app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
