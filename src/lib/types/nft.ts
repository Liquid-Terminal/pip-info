// Types pour l'API des NFT holders
export interface NFTHoldersResponse {
  items: NFTHolderItem[];
  next_page_params?: NextPageParams;
}

export interface NFTHolderItem {
  address: {
    ens_domain_name: string | null;
    hash: string;
    implementations: unknown[];
    is_contract: boolean;
    is_scam: boolean;
    is_verified: boolean;
    metadata: unknown;
    name: string | null;
    private_tags: unknown[];
    proxy_type: string | null;
    public_tags: unknown[];
    watchlist_names: unknown[];
  };
  token_id: string | null;
  value: string; // Nombre de NFTs détenus
}

export interface NextPageParams {
  address_hash: string;
  items_count: number;
  value: number;
}

export interface NFTHolder {
  address: string;
  nftCount: number;
  percentage: number;
  rank: number;
}

export interface NFTCollectionInfo {
  totalSupply: number;
  totalHolders: number;
  floorPrice?: string;
  volume24h?: string;
}

export interface NFTFloorPriceResponse {
  floorPriceHype: number;
  floorPriceUsd: number;
  lastUpdated: string;
}

export interface CSVHolder {
  address: string;
  balance: number;
}

export interface ProcessedNFTData {
  holders: NFTHolder[];
  totalHolders: number;
  totalNFTs: number;
  lastUpdated: string;
}

export interface PaginatedResult {
  holders: NFTHolder[];
  pagination: {
    page: number;
    itemsPerPage: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

// Types pour l'API HyperScan
export interface HyperScanNFTResponse {
  address: string;
  address_hash: string;
  circulating_market_cap: string | null;
  decimals: number | null;
  exchange_rate: string | null;
  holders: string;
  holders_count: string;
  icon_url: string | null;
  name: string;
  symbol: string;
  total_supply: string;
  type: string;
  volume_24h: string | null;
}

export interface HyperScanNFTInfo {
  address: string;
  name: string;
  symbol: string;
  totalSupply: string;
  holdersCount: string;
  type: string;
}
