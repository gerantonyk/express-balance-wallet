import { GetTokenPriceRequest } from '@ankr.com/ankr.js';

export interface GetTokensWithPriceDto extends GetTokenPriceRequest {
  walletAddress: string;
}
