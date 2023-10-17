import dotenv from 'dotenv';
import { AnkrProvider } from '@ankr.com/ankr.js';
dotenv.config();

export const provider = new AnkrProvider(
  'https://rpc.ankr.com/multichain/' + process.env.ANKR_API_KEY || ''
);
