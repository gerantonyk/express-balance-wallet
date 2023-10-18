import { Request, Response } from 'express';
import { Provider } from '../providers/ankrProvider';
import { Blockchain } from '@ankr.com/ankr.js';

const provider = new Provider();

export const getCurrencies = async (req: Request, res: Response) => {
  const blockchain = (req.query.blockchain || 'eth') as Blockchain;

  try {
    const currencies = await provider.getCurrencies(blockchain);
    res.json({ currencies });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
