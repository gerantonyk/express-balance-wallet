import { Request, Response } from 'express';
import { Provider } from '../providers/ankrProvider';
import { GetTokensWithPriceDto } from '../dtos/getTokensWithPrice.dto';
import { Blockchain } from '@ankr.com/ankr.js';

const provider = new Provider();

export const getTokensWithPrice = async (req: Request, res: Response) => {
  const tokenRequest: GetTokensWithPriceDto = {
    walletAddress: req.query.walletAddress as string,
    blockchain: (req.query.blockchain || 'eth') as Blockchain,
    contractAddress: req.query.contractAddress as string | undefined,
  };
  if (!tokenRequest.walletAddress) {
    return res.status(400).send('walletAddress is required');
  }

  try {
    const tokens = await provider.getTokensWithPrice(tokenRequest);
    res.json({ tokens });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
