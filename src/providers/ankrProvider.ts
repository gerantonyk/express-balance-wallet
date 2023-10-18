import dotenv from 'dotenv';
import {
  AnkrProvider,
  Blockchain,
  GetTokenPriceReply,
} from '@ankr.com/ankr.js';
import { GetTokensWithPriceDto } from '../dtos/getTokensWithPrice.dto';
dotenv.config();

export class Provider {
  private provider: AnkrProvider;

  constructor() {
    this.provider = new AnkrProvider(
      'https://rpc.ankr.com/multichain/' + process.env.ANKR_API_KEY || ''
    );
  }

  async getTokensWithPrice(request: GetTokensWithPriceDto) {
    const { blockchain, contractAddress, walletAddress } = request;

    const balance = await this.provider.getAccountBalance({
      blockchain,
      walletAddress,
    });

    const { assets } = balance;

    if (assets.length === 0) return [];

    //reference token price
    let referenceToken: GetTokenPriceReply;
    if (typeof contractAddress !== 'undefined') {
      referenceToken = await this.provider.getTokenPrice({
        contractAddress,
        blockchain,
      });
    } else {
      referenceToken = await this.provider.getTokenPrice({ blockchain });
    }

    return assets.map((asset) => {
      return {
        ...asset,
        balanceReferenceToken:
          Number(asset.balanceUsd) / Number(referenceToken.usdPrice),
      };
    });
  }

  async getCurrencies(blockchain: Blockchain) {
    const response = await this.provider.getCurrencies({ blockchain });
    const { currencies } = response;
    return currencies;
  }
}
