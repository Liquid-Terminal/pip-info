// Token IDs pour différents projets
export const TOKEN_IDS = {
  PIP: "0xe85f43e1f91e3c8cdf3acbd7e0855b8e",
  // Ajouter d'autres tokens ici quand tu fork le projet
  // EXAMPLE: "0x1234567890abcdef...",
} as const;

// Noms de tokens pour l'API holders
export const TOKEN_NAMES = {
  PIP: "PIP",
  // Ajouter d'autres noms de tokens ici
  // EXAMPLE: "EXAMPLE",
} as const;

// NFT Contract Addresses pour différents projets
export const NFT_CONTRACT_ADDRESSES = {
  PIP: "0xbc4a26ba78ce05E8bCbF069Bbb87FB3E1dAC8DF8",
  // Ajouter d'autres contrats NFT ici quand tu fork le projet
  // EXAMPLE: "0x1234567890abcdef...",
} as const;

// Configuration API
export const API_CONFIG = {
  HYPERLIQUID_BASE_URL: "https://api.hyperliquid.xyz",
  HOLDERS_BASE_URL: "https://api.hypurrscan.io",
  HYPERSCAN_BASE_URL: "https://www.hyperscan.com/api/v2",
  REFRESH_INTERVAL: 30000, // 30 secondes pour les données token
  HOLDERS_REFRESH_INTERVAL: 600000, // 10 minutes pour les holders
  NFT_HOLDERS_REFRESH_INTERVAL: 600000, // 10 minutes pour les NFT holders
} as const;

// Configuration WebSocket pour les prix en temps réel
export const WEBSOCKET_CONFIG = {
  HYPERLIQUID_WS_URL: "wss://api.hyperliquid.xyz/ws",
  // Ajouter d'autres URLs WebSocket ici si nécessaire
  // EXAMPLE_WS_URL: "wss://example.com/ws",
} as const;

// Configuration des coins pour HyperLiquid
export const HYPERLIQUID_COINS = {
  PIP: "@107",
  // Ajouter d'autres coins ici quand tu fork le projet
  // EXAMPLE: "@123",
} as const;

// Configuration des projets (pour faciliter le fork)
export const PROJECT_CONFIG = {
  PIP: {
    tokenId: TOKEN_IDS.PIP,
    tokenName: TOKEN_NAMES.PIP,
    nftContractAddress: NFT_CONTRACT_ADDRESSES.PIP,
    hyperliquidCoinId: HYPERLIQUID_COINS.PIP,
    // Ajouter d'autres propriétés spécifiques au projet ici
  },
  // Ajouter d'autres projets ici quand tu fork
  // EXAMPLE: {
  //   tokenId: TOKEN_IDS.EXAMPLE,
  //   tokenName: TOKEN_NAMES.EXAMPLE,
  //   nftContractAddress: NFT_CONTRACT_ADDRESSES.EXAMPLE,
  //   hyperliquidCoinId: HYPERLIQUID_COINS.EXAMPLE,
  // },
} as const;
