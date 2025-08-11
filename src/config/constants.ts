// Token IDs for different projects
export const TOKEN_IDS = {
  PIP: "0xe85f43e1f91e3c8cdf3acbd7e0855b8e",
  // Add other tokens here when forking the project
  // EXAMPLE: "0x1234567890abcdef...",
} as const;

// Token names for the holders API
export const TOKEN_NAMES = {
  PIP: "PIP",
  // Add other token names here
  // EXAMPLE: "EXAMPLE",
} as const;

// NFT Contract Addresses for different projects
export const NFT_CONTRACT_ADDRESSES = {
  PIP: "0xbc4a26ba78ce05E8bCbF069Bbb87FB3E1dAC8DF8",
  // Add other NFT contracts here when forking the project
  // EXAMPLE: "0x1234567890abcdef...",
} as const;

// API Configuration
export const API_CONFIG = {
  HYPERLIQUID_BASE_URL: "https://api.hyperliquid.xyz",
  HOLDERS_BASE_URL: "https://api.hypurrscan.io",
  HYPERSCAN_BASE_URL: "https://www.hyperscan.com/api/v2",
  REFRESH_INTERVAL: 30000, // 30 seconds for token data
  HOLDERS_REFRESH_INTERVAL: 600000, // 10 minutes for holders
  NFT_HOLDERS_REFRESH_INTERVAL: 600000, // 10 minutes for NFT holders
} as const;

// WebSocket configuration for real-time prices
export const WEBSOCKET_CONFIG = {
  HYPERLIQUID_WS_URL: "wss://api.hyperliquid.xyz/ws",
  // Add other WebSocket URLs here if needed
  // EXAMPLE_WS_URL: "wss://example.com/ws",
} as const;

// HyperLiquid Coin IDs
export const HYPERLIQUID_COINS = {
  PIP: "@107",
  // Add other coins here when forking the project
  // EXAMPLE: "@123",
} as const;

// Complete project configuration (for easy forking)
export const PROJECT_INFO = {
  PIP: {
    // Technical identifiers
    tokenId: TOKEN_IDS.PIP,
    tokenName: TOKEN_NAMES.PIP,
    nftContractAddress: NFT_CONTRACT_ADDRESSES.PIP,
    hyperliquidCoinId: HYPERLIQUID_COINS.PIP,
    
    // Display information
    name: "PIP",
    description: "PiP is a community-driven movement and Hyperliquid's mascot symbolizing hydration and flow. A passionate team is exploring merchandise and toys, with the community shaping its future. Stay hydrated and engaged.",
    type: "Memecoin",
    chain: "HyperLiquid",
    launch: "2024-10-30",
    
    // Assets
    banner: "/bannerInfoCard.jpg",
    background: "/background.webp",
    logo: "/pip-logo.png", // Add if needed
    nftIcon: "/nft.png",
    tokenIcon: "/token.png",
    projectLogo: "/pending.jpg",
    
    // Links
    links: {
      website: "https://pip.meme/",
      telegram: "https://t.me/piponhl",
      pipMedia: "https://t.me/tickerispip",
      twitter: "https://x.com/PiPonHL",
      trading: "https://app.hyperliquid.xyz/trade/0xe85f43e1f91e3c8cdf3acbd7e0855b8e",
      nft: "https://drip.trade/collections/pip"
    },
    
    // Export file prefixes
    exportPrefix: "pip-holders-page",
  },
  // Add other projects here when forking
  // EXAMPLE: {
  //   tokenId: TOKEN_IDS.EXAMPLE,
  //   tokenName: TOKEN_NAMES.EXAMPLE,
  //   nftContractAddress: NFT_CONTRACT_ADDRESSES.EXAMPLE,
  //   hyperliquidCoinId: HYPERLIQUID_COINS.EXAMPLE,
  //   name: "EXAMPLE",
  //   description: "Description of your EXAMPLE project...",
  //   type: "Memecoin",
  //   chain: "HyperLiquid",
  //   launch: "2024-01-01",
  //   banner: "/example-background.webp",
  //   logo: "/example-logo.png",
  //   links: {
  //     website: "https://example.com/",
  //     telegram: "https://t.me/example",
  //     twitter: "https://x.com/example",
  //     trading: "https://app.hyperliquid.xyz/trade/EXAMPLE_ID",
  //     nft: "https://drip.trade/collections/example"
  //   },
  //   exportPrefix: "example-holders-page",
  // },
} as const;
