export interface HyperLiquidTokenRequest {
  tokenId: string;
  type: "tokenDetails";
}

export interface HyperLiquidTokenResponse {
  name: string;
  maxSupply: string;
  totalSupply: string;
  circulatingSupply: string;
  deployGas: string;
  deployTime: string;
  deployer: string;
  futureEmissions: string;
  genesis: {
    userBalances: [string, string][];
  };
  markPx: string;
  midPx: string;
  nonCirculatingUserBalances: [string, string][];
  prevDayPx: string;
  seededUsdc: string;
  szDecimals: number;
  weiDecimals: number;
}

export interface TokenInfo {
  name: string;
  symbol: string;
  price: string;
  marketCap: string;
  totalSupply: string;
  circulatingSupply: string;
  deployTime: string;
  deployer: string;
  priceChange24h: string;
}

// Types pour l'API des holders
export interface HoldersResponse {
  token: string;
  lastUpdate: number;
  holdersCount: number;
  length: number;
  holders: Record<string, number>;
}

export interface Holder {
  address: string;
  balance: number;
  percentage: number;
  rank: number;
}
