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
