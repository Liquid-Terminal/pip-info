# 🚀 Fork Guide - Token Information Dashboard

This guide explains how to adapt this project for any token/project.

## 📋 Forking Steps

### 1. **Configuration Constants** (`src/config/constants.ts`)

#### Add your token to the constants:

```typescript
// Token IDs
export const TOKEN_IDS = {
  PIP: "0xe85f43e1f91e3c8cdf3acbd7e0855b8e",
  YOUR_TOKEN: "0x1234567890abcdef...", // ← Your token ID
} as const;

// Token names
export const TOKEN_NAMES = {
  PIP: "PIP",
  YOUR_TOKEN: "YOUR_TOKEN", // ← Your token name
} as const;

// NFT Contract Addresses
export const NFT_CONTRACT_ADDRESSES = {
  PIP: "0xbc4a26ba78ce05E8bCbF069Bbb87FB3E1dAC8DF8",
  YOUR_TOKEN: "0xabcdef1234567890...", // ← Your NFT contract
} as const;

// HyperLiquid Coin IDs
export const HYPERLIQUID_COINS = {
  PIP: "@107",
  YOUR_TOKEN: "@123", // ← Your coin ID on HyperLiquid
} as const;
```

#### Configure project information:

```typescript
export const PROJECT_INFO = {
  YOUR_TOKEN: {
    // Technical identifiers
    tokenId: TOKEN_IDS.YOUR_TOKEN,
    tokenName: TOKEN_NAMES.YOUR_TOKEN,
    nftContractAddress: NFT_CONTRACT_ADDRESSES.YOUR_TOKEN,
    hyperliquidCoinId: HYPERLIQUID_COINS.YOUR_TOKEN,
    
    // Display information
    name: "YOUR_TOKEN",
    description: "Description of your project...",
    type: "Memecoin", // or other type
    chain: "HyperLiquid", // or other chain
    launch: "2024-01-01",
    
    // Assets (add to /public/)
    banner: "/your-background.webp",
    logo: "/your-logo.png",
    
    // Links
    links: {
      website: "https://your-site.com/",
      telegram: "https://t.me/your-group",
      twitter: "https://x.com/your-account",
      trading: "https://app.hyperliquid.xyz/trade/YOUR_TOKEN_ID",
      nft: "https://drip.trade/collections/your-collection"
    },
    
    // Export file prefixes
    exportPrefix: "your-token-holders-page",
  },
} as const;
```

### 2. **Update Components**

#### In `src/app/page.tsx`:
```typescript
import { PROJECT_INFO } from "@/config/constants";

// Replace staticTokenInfo with:
const staticTokenInfo = PROJECT_INFO.YOUR_TOKEN;

// Update references:
const { tokenInfo } = useTokenData({
  tokenId: PROJECT_INFO.YOUR_TOKEN.tokenId,
  refreshInterval: 30000
});

// In JSX:
<TokenSection tokenId={PROJECT_INFO.YOUR_TOKEN.tokenId} />
```

#### In `src/components/tokenSection/TokenHoldersCard.tsx`:
```typescript
// Replace hardcoded references:
tokenName: PROJECT_INFO.YOUR_TOKEN.tokenName,
tokenId: PROJECT_INFO.YOUR_TOKEN.tokenId,

// For CSV export:
a.download = `${PROJECT_INFO.YOUR_TOKEN.exportPrefix}-${currentPage}-${new Date().toISOString().split('T')[0]}.csv`;
```

#### In `src/lib/api/nftHoldersProcessor.ts`:
```typescript
// Replace:
const contractAddress = NFT_CONTRACT_ADDRESSES.PIP;

// With:
const contractAddress = PROJECT_INFO.YOUR_TOKEN.nftContractAddress;
```

### 3. **Add Assets**

1. **Background**: Add your background image to `/public/`
2. **Logo**: Add your logo to `/public/`
3. **Icons**: Replace `nft.png` and `token.png` with your icons

### 4. **Update Metadata**

#### In `package.json`:
```json
{
  "name": "your-token-info",
  "version": "0.1.0",
  "private": true,
  // ...
}
```

#### In `README.md`:
- Update the description
- Change links to your repository

### 5. **Deployment Configuration**

#### For Vercel:
- Connect your repository
- Environment variables are already configured

#### For other platforms:
- Adapt according to needs

## 🔧 Advanced Configuration

### Change refresh intervals:
```typescript
export const API_CONFIG = {
  // ...
  REFRESH_INTERVAL: 30000, // 30 seconds
  HOLDERS_REFRESH_INTERVAL: 600000, // 10 minutes
  NFT_HOLDERS_REFRESH_INTERVAL: 600000, // 10 minutes
} as const;
```

### Add other APIs:
If your token is not on HyperLiquid, you'll need to:
1. Modify `src/lib/api/` for your API
2. Adapt hooks in `src/hooks/`
3. Update types in `src/lib/types/`

## 📁 Files to Modify

```
src/
├── config/
│   └── constants.ts          ← MAIN (configure everything here)
├── app/
│   └── page.tsx             ← Use PROJECT_INFO
├── components/
│   ├── tokenSection/
│   │   └── TokenHoldersCard.tsx
│   └── nftSection/
│       └── NFTHoldersCard.tsx
├── lib/
│   └── api/
│       └── nftHoldersProcessor.ts
└── hooks/
    └── useRealTimePrice.ts
```

## ✅ Fork Checklist

- [ ] Add your token to `TOKEN_IDS`, `TOKEN_NAMES`, `NFT_CONTRACT_ADDRESSES`, `HYPERLIQUID_COINS`
- [ ] Create your configuration in `PROJECT_INFO`
- [ ] Update `src/app/page.tsx` to use `PROJECT_INFO`
- [ ] Update components to use new configuration
- [ ] Add your assets to `/public/`
- [ ] Update `package.json` and `README.md`
- [ ] Test deployment

## 🎯 Complete Example

See the `src/config/constants.ts` file for a complete example with detailed comments.

## 🔍 Finding Your Token Information

### Token ID (HyperLiquid):
1. Go to [HyperLiquid](https://app.hyperliquid.xyz/)
2. Find your token in the trading interface
3. Copy the token ID from the URL or trading interface

### NFT Contract Address:
1. Find your NFT collection on [Drip.Trade](https://drip.trade/)
2. Copy the contract address from the collection page

### HyperLiquid Coin ID:
1. Check the HyperLiquid API documentation
2. Or inspect network requests in browser dev tools

## 🚀 Quick Deployment

1. **Fork this repository**
2. **Update constants** in `src/config/constants.ts`
3. **Add your assets** to `/public/`
4. **Deploy to Vercel** (automatic from GitHub)

---

**💡 Tip**: Start by copying the `PIP` configuration and gradually replace values with your project's information.
